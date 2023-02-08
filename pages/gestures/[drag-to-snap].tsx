import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import styles from './drag-to-snap.module.scss';

export type TPosition = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const Item = ({
  i,
  onClick,
  setPosition,
  selected,
  onMove,
  onMoveEnd,
  active,
}: {
  i: number;
  onClick: (_i: number) => void;
  setPosition: (_i: number, _pos: TPosition) => void;
  onMove: (
    _i: number,
    _xOffset: number,
    _yOffset: number,
    _width: number
  ) => void;
  onMoveEnd: (
    _i: number,
    _xOffset: number,
    _yOffset: number,
    _width: number
  ) => void;
  selected: number;
  active?: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const borderRadius = useTransform(x, xInput, ['100px', '20px', '100px']);
  const background = useTransform(x, xInput, [
    'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, rgb(211, 9, 225) 100%)',
    'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
    'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
  ]);
  const color = useTransform(x, xInput, [
    'rgb(189, 205, 214)',
    selected === i ? 'rgb(255, 255, 255)' : 'rgb(68, 0, 255)',
    'rgb(189, 205, 214)',
  ]);

  useEffect(() => {
    setPosition(i, {
      height: ref.current?.offsetHeight ?? 0,
      width: ref.current?.offsetWidth ?? 0,
      top: ref.current?.offsetTop ?? 0,
      left: ref.current?.offsetLeft ?? 0,
    });
  }, [i, setPosition]);

  const handleClick = () => {
    onClick(i);
  };

  const handleMove = (i: number, x: number, y: number) => {
    const width = ref.current?.offsetWidth ?? 0;
    setIsDragging(true);
    onMove(i, x, y, width);
  };

  const handleMoveEnd = (i: number, x: number, y: number) => {
    const width = ref.current?.offsetWidth ?? 0;
    setIsDragging(false);
    onMoveEnd(i, x, y, width);
  };

  return (
    <motion.div
      key={i}
      ref={ref}
      className={styles.itemOuter}
      style={{ background }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: active && selected !== i ? 1.05 : 1,
        zIndex: isDragging ? 10 : 0,
      }}
    >
      <motion.div className={styles.item} onClick={handleClick}>
        <motion.span style={{ color }}>{i}</motion.span>
        {selected === i && (
          <motion.div
            layoutId="active"
            className={styles.active}
            style={{ borderRadius, background }}
          />
        )}
        {selected === i && (
          <motion.div
            className={styles.selected}
            layoutId="outline"
            initial={false}
            drag
            animate={{ zIndex: isDragging ? 10 : 9 }}
            onDrag={(e, { point }) => {
              handleMove(i, point.x, point.y);
            }}
            onDragEnd={(e, { point }) => {
              handleMoveEnd(i, point.x, point.y);
            }}
            dragSnapToOrigin
            style={{ x }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default function DragToSnap() {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const positions = useRef<TPosition[]>([]).current;
  const setPosition = (i: number, offset: TPosition) => (positions[i] = offset);

  const moveLogic = (
    i: number,
    xOffset: number,
    yOffset: number,
    width: number
  ) => {
    const xNeedle = xOffset - width / 2;
    const yNeedle = yOffset - width / 2; // replace width height

    const closestX = positions.reduce((a, b) => {
      return Math.abs(b.left - xNeedle) < Math.abs(a.left - xNeedle) ? b : a;
    });
    const closestY = positions.reduce((a, b) => {
      return Math.abs(b.top - yNeedle) < Math.abs(a.top - yNeedle) ? b : a;
    });

    const closestItem = positions.find(
      (x) => x.left === closestX.left && x.top === closestY.top
    );

    const closestIndex = positions.indexOf(closestItem as TPosition);

    return closestIndex ?? i;
  };

  const handleMove = (
    i: number,
    xOffset: number,
    yOffset: number,
    width: number
  ) => {
    const activeItem = moveLogic(i, xOffset, yOffset, width);
    setActive(activeItem);
  };

  const handleMoveEnd = (
    i: number,
    xOffset: number,
    yOffset: number,
    width: number
  ) => {
    const selectedItem = moveLogic(i, xOffset, yOffset, width);

    setSelected(selectedItem);
    setActive(selectedItem);
  };

  const handleClick = (i: number) => {
    setSelected(i);
    setActive(i);
  };

  return (
    <motion.div className={styles.dragToSnap} ref={constraintsRef}>
      {Array.from(Array(12).keys()).map((x) => {
        return (
          <Item
            key={x}
            i={x}
            onMoveEnd={handleMoveEnd}
            selected={selected}
            setPosition={setPosition}
            onMove={handleMove}
            onClick={handleClick}
            active={active === x}
          />
        );
      })}
    </motion.div>
  );
}

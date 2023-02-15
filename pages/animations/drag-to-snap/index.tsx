import { useEffect, useRef, useState } from 'react';
import { Layout } from 'components';
import { motion, useMotionValue, useTransform } from 'framer-motion';

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
  const y = useMotionValue(0);
  const yInput = [100, 0, -100];
  const borderR = useTransform(x, xInput, [
    '71% 29% 21% 79% / 52% 44% 56% 48%',
    '52% 48% 48% 52% / 43% 44% 56% 57%',
    '31% 69% 70% 30% / 41% 51% 49% 59%',
  ]);
  const _background = useTransform(x, xInput, [
    'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, rgb(211, 9, 225) 100%)',
    'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
    'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
  ]);
  const color = useTransform(x, xInput, [
    'rgb(189, 205, 214)',
    selected === i ? 'rgb(255, 255, 255)' : 'rgb(168, 100, 255)',
    'rgb(189, 205, 214)',
  ]);
  const scaleActiveX = useTransform(x, xInput, [
    3,
    selected === i ? 1 : 0.5,
    3,
  ]);
  const scaleActiveY = useTransform(y, yInput, [
    3,
    selected === i ? 1 : 0.5,
    3,
  ]);
  const activeX = useTransform(x, xInput, [-50, 0, 50]);
  const activeY = useTransform(y, yInput, [100, 0, -100]);

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
      className="p-1 h-36 w-[calc(50%-1rem)] lg:w-[calc(100vw*(5/12)/3-1.375rem)]"
      style={{ borderRadius: borderR, background: '#7700ff' }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: active && selected !== i ? 1.05 : 1,
        zIndex: isDragging ? 10 : 0,
      }}
      dragListener={false}
    >
      <motion.div
        className="flex relative items-center justify-center self-start h-full cursor-pointer"
        onClick={handleClick}
      >
        <motion.span
          style={{ color }}
          className="z-20 pointer-events-none text-3xl"
        >
          {i}
        </motion.span>
        {selected === i && (
          <motion.div
            layoutId="active"
            className="w-2/5 h-2/5 absolute top-9/10 rounded-full"
            style={{
              background: '#7700ff',
              scaleX: scaleActiveX,
              scaleY: scaleActiveY,
              x: activeX,
              y: activeY,
            }}
          />
        )}
        {selected === i && (
          <motion.div
            className="bg-black w-16 h-16 absolute rounded-full cursor-grab active:cursor-grabbing"
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
            style={{ x, y }}
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
    <Layout>
      <motion.div
        className="flex flex-wrap gap-4 min-h-screen w-screen p-4 pt-0 bg-white content-start lg:w-5/12 mx-auto"
        ref={constraintsRef}
      >
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
    </Layout>
  );
}

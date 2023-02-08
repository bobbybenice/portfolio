import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Head from 'next/head';

import styles from './example.module.scss';

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
  const ref = useRef<HTMLDivElement>(null);

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
    onMove(i, x, y, width);
  };

  const handleMoveEnd = (i: number, x: number, y: number) => {
    const width = ref.current?.offsetWidth ?? 0;
    console.log('HERE');
    onMoveEnd(i, x, y, width);
  };

  return (
    <motion.div
      key={i}
      ref={ref}
      className={styles.item}
      onClick={handleClick}
      style={{ backgroundColor: active ? 'lightblue' : 'white' }}
      animate={{
        scale: active && selected !== i ? 1.1 : 1,
      }}
    >
      <span>{i}</span>
      {selected === i && (
        <motion.div
          layoutId="active"
          initial={false}
          className={styles.active}
        />
      )}
      {selected === i && (
        <motion.div
          className={styles.selected}
          layoutId="outline"
          initial={false}
          drag
          onDrag={(e, { point }) => {
            handleMove(i, point.x, point.y);
          }}
          onDragEnd={(e, { point }) => {
            handleMoveEnd(i, point.x, point.y);
          }}
          dragSnapToOrigin
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </motion.div>
  );
};

export const Example = () => {
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
    console.log('MOVE END: ', selectedItem);
    setSelected(selectedItem);
    setActive(selectedItem);
  };

  const handleClick = (i: number) => {
    setSelected(i);
    setActive(i);
  };

  console.log('ACTIVE: ', active);
  console.log('SELECTED: ', selected);

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
    'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
    'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
  ]);
  const color = useTransform(x, xInput, [
    'rgb(211, 9, 225)',
    'rgb(68, 0, 255)',
    'rgb(3, 209, 0)',
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <motion.div className={styles.exampleContainer} style={{ background }}>
      <motion.div
        className={styles.box}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <svg className={styles.progressIcon} viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
      <div className={styles.selectItems} ref={constraintsRef}>
        {Array.from(Array(10).keys()).map((x) => {
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
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          backgroundColor: 'lightblue',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Example />
        {/* <Link href="/anime">Anime</Link>
        <Link href="/nba">Nba</Link> */}
      </main>
    </div>
  );
}

import { useState } from 'react';
import {
  AnimatePresence,
  AnimationProps,
  DraggableProps,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';

import { images } from '../carousel';

type TMain = {
  type: 'main';
  drag: 'x' | 'y' | boolean;
  max: number;
  setIndex: (_i: number) => void;
  setExitX: (_x: string | number) => void;
  exitX: string | number;
  prev: number;
  next: number;
};

type TSidekick = {
  type: 'sidekick';
  drag?: never;
  max?: never;
};

type TCard = Pick<DraggableProps, 'drag'> &
  AnimationProps & {
    index?: number;
    src: string;
  } & (
    | {
        transition: Pick<AnimationProps, 'transition'> & {
          type: 'spring';
        };
      }
    | {
        transition: Pick<AnimationProps, 'transition'> & {
          type: 'tween';
        };
      }
  ) &
  (TMain | TSidekick);

function Card(props: TCard) {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-200, 0, 200], [-45, 0, 45], {
    clamp: false,
  });

  function handleDragEnd(event: any, info: PanInfo) {
    if (props.type === 'main') {
      if (info.offset.x < -60) {
        props.setExitX(-200);
        props.setIndex(props.prev);
      }
      if (info.offset.x > 60) {
        props.setExitX?.(200);
        props.setIndex(props.next);
      }
    }
  }

  return (
    <motion.div
      layout
      style={{
        width: 250,
        height: 250,
        position: 'absolute',
        top: 0,
        x: x,
        rotate: rotate,
        cursor: 'grab',
        zIndex: !!props.drag ? 10 : 0,
      }}
      whileTap={{ cursor: 'grabbing' }}
      drag={props.drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      dragElastic={0.8}
      onDragEnd={props.type === 'main' ? handleDragEnd : undefined}
      dragDirectionLock
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      exit={{
        x: props.type === 'main' ? props.exitX : 0,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        style={{
          width: 250,
          height: 250,
          backgroundColor: props.type === 'main' ? '#ff0000' : '#00aabb',
          borderRadius: 30,
          scale,
          backgroundImage: `url(${props.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </motion.div>
  );
}

export default function InfiniteCarousel() {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState<string | number>('100%');

  const handleSetIndex = (index: number) => {
    setIndex(index);
  };

  const prevIndex = index > 0 ? index - 1 : images.length - 1;

  const nextIndex = index < images.length - 1 ? index + 1 : 0;

  // console.log('PREV INDEX: ', prevIndex);
  // console.log('INDEX: ', index);
  // console.log('NEXT INDEX: ', nextIndex);

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <motion.div
        style={{
          width: 250,
          height: 250,
          position: 'relative',
        }}
      >
        <AnimatePresence custom={index}>
          <Card
            type="sidekick"
            key={prevIndex}
            initial={{ scale: 0, x: 200, opacity: 0 }}
            animate={{ scale: 0.75, x: 100, opacity: 0.75 }}
            transition={{
              type: 'tween',
              scale: { duration: 0.2 },
              opacity: { duration: 0.4 },
            }}
            src={images[prevIndex]}
          />
          <Card
            type="main"
            key={index}
            src={images[index]}
            animate={{ scale: 1, x: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              opacity: { duration: 0.2 },
            }}
            exitX={exitX}
            setExitX={setExitX}
            index={index}
            setIndex={handleSetIndex}
            drag="x"
            max={images.length - 1}
            prev={prevIndex}
            next={nextIndex}
          />
          <Card
            type="sidekick"
            key={nextIndex}
            initial={{ scale: 0, x: -200, opacity: 0 }}
            animate={{ scale: 0.75, x: -100, opacity: 0.75 }}
            transition={{
              type: 'tween',
              scale: { duration: 0.2 },
              opacity: { duration: 0.4 },
            }}
            src={images[nextIndex]}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

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

import { carouselData } from './data';

type TMain = {
  type: 'main';
  drag: 'x' | 'y' | boolean;
  max: number;
  setIndex: (_i: number) => void;
  setExitX: (_x: string | number) => void;
  exitX: string | number;
  prev: number;
  next: number;
  onClick: () => void;
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
  const rotateY = useTransform(x, [-200, 0, 200], [-90, 0, -90], {
    clamp: false,
  });
  const rotateX = useTransform(x, [-200, 0, 200], [-45, 0, 45], {
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
        cursor: 'grab',
        zIndex: !!props.drag ? 10 : 0,
        x,
        rotateX,
        rotateY,
        borderRadius: '30px',
        // overflow: 'hidden',
      }}
      drag={props.drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onClick={props.type === 'main' ? props.onClick : undefined}
      dragElastic={0.8}
      onDragEnd={props.type === 'main' ? handleDragEnd : undefined}
      dragDirectionLock
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      dragSnapToOrigin={props.type === 'main'}
      exit={{
        x: props.type === 'main' ? props.exitX : 0,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
      whileHover={props.type === 'main' ? { scale: 1.05 } : {}}
      whileTap={
        props.type === 'main' ? { scale: 0.95, cursor: 'grabbing' } : {}
      }
    >
      <motion.div
        layoutId={props.src}
        className="rounded-lg"
        style={{
          width: 250,
          height: 250,
          background:
            'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
          scale,
          backgroundImage: `url(${props.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </motion.div>
  );
}

export default function InfiniteCarousel() {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState<string | number>('100%');
  const [expanded, setExpanded] = useState(false);

  const handleSetIndex = (index: number) => {
    setIndex(index);
  };

  const prevIndex = index > 0 ? index - 1 : carouselData.length - 1;

  const nextIndex = index < carouselData.length - 1 ? index + 1 : 0;

  // console.log('PREV INDEX: ', prevIndex);
  // console.log('INDEX: ', index);
  // console.log('NEXT INDEX: ', nextIndex);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-8 justify-center items-center overflow-hidden">
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
            src={carouselData[prevIndex].image}
          />
          <Card
            type="main"
            key={index}
            src={carouselData[index].image}
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
            max={carouselData.length - 1}
            prev={prevIndex}
            next={nextIndex}
            onClick={() => setExpanded(!expanded)}
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
            src={carouselData[nextIndex].image}
          />
        </AnimatePresence>
      </motion.div>
      {!expanded && (
        <motion.h1
          onClick={() => setExpanded(true)}
          layoutId={`${carouselData[index].title}`}
          className="text-2xl uppercase font-bold text-white bg-fuchsia-500 py-2 px-6 rounded-full cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {carouselData[index].title}
        </motion.h1>
      )}
      {expanded && (
        <motion.div
          layoutId={carouselData[index].image}
          className="w-screen h-screen fixed top-4 lg:top-0 lg:w-[50vw] lg:h-[50vw] rounded-lg bg-cover bg-center bg-no-repeat z-50 overflow-hidden lg:relative flex justify-center items-center"
          style={{
            backgroundImage: `url(${carouselData[index].image})`,
          }}
        >
          <motion.div className="absolute w-full h-full bg-white/90 -z-10" />
          <motion.h1
            onClick={() => setExpanded(false)}
            layoutId={`${carouselData[index].title}`}
            className="text-2xl uppercase font-bold text-white bg-fuchsia-500 py-2 px-6 rounded-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {carouselData[index].title}
          </motion.h1>
        </motion.div>
      )}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/75 absolute top-0 left-0 w-screen h-screen z-40"
            onClick={() => setExpanded(false)}
            style={{
              background: 'rbga(0,0,0,0.75)',
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

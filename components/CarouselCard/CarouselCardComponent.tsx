import { useCallback } from 'react';
import {
  AnimationProps,
  DraggableProps,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';

type TMain = {
  type: 'main';
  drag: 'x' | 'y' | boolean;
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
};

type TCard = Pick<DraggableProps, 'drag'> &
  AnimationProps & {
    index?: number;
    src: string;
    overflowHidden?: boolean;
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

export const CARD_WIDTH = 300;

export const CarouselCard = ({ overflowHidden, ...props }: TCard) => {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 0, 200], [-90, 0, -90], {
    clamp: false,
  });
  const rotateX = useTransform(x, [-200, 0, 200], [-45, 0, 45], {
    clamp: false,
  });

  const handleDragEnd = useCallback(
    (event: any, info: PanInfo) => {
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
    },
    [props]
  );

  return (
    <motion.div
      layout
      className={`w-[${CARD_WIDTH}] h-[${CARD_WIDTH}] absolute z-${
        props.type === 'main' ? 10 : 0
      } cursor-grab rounded-lg`}
      style={{
        rotateX,
        rotateY,
        x,
        overflow: overflowHidden ? 'hidden' : 'visible',
      }}
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
      dragSnapToOrigin={props.type === 'main'}
      exit={{
        x: props.type === 'main' ? props.exitX : 0,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
      whileHover={props.type === 'main' ? { scale: 1.05 } : {}}
      whileTap={props.type === 'main' ? { cursor: 'grabbing' } : {}}
    >
      <motion.div
        layoutId={props.src}
        className="rounded-lg"
        style={{
          width: CARD_WIDTH,
          height: CARD_WIDTH,
          background:
            'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
          backgroundImage: `url(${props.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <motion.div
        className="absolute w-8 h-8 rounded-full bottom-4 right-4 bg-fuchsia-500 z-30 flex justify-center items-center pointer-events-auto"
        layoutId={`${props.src}-button`}
        onClick={props.type === 'main' ? props.onClick : undefined}
        whileHover={
          props.type === 'main' ? { scale: 1.05, cursor: 'pointer' } : {}
        }
        whileTap={
          props.type === 'main' ? { scale: 0.95, cursor: 'pointer' } : {}
        }
      >
        <motion.div className="w-4 h-4 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
};

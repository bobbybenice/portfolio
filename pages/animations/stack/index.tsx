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

const images = [
  'https://images.unsplash.com/photo-1453301109223-3e2085a1e69d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3088&q=80',
  'https://images.unsplash.com/photo-1561917443-6c5a9a4fca6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3086&q=80',
  'https://images.unsplash.com/photo-1649785118522-34139e0d0385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3063&q=80',
];

type TCard = Pick<DraggableProps, 'drag'> &
  AnimationProps & {
    index: number;
    setExitX?: (_x: string | number) => void;
    setIndex?: (_i: number) => void;
    exitX?: string | number;
    items: Array<string>;
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
  );

function Card(props: TCard) {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  function handleDragEnd(event: any, info: PanInfo) {
    if (props.setExitX && props.setIndex) {
      if (info.offset.x < -100) {
        props.setExitX(-250);
        props.setIndex(
          props.index > 0 ? props.index - 1 : props.items.length - 1
        );
      }
      if (info.offset.x > 100) {
        props.setExitX(250);
        props.setIndex(
          props.index === props.items.length - 1 ? 0 : props.index + 1
        );
      }
    }
  }

  return (
    <motion.div
      style={{
        width: 150,
        height: 150,
        position: 'absolute',
        top: 0,
        x: x,
        rotate: rotate,
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      drag={props.drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      exit={{
        x: props.exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        style={{
          width: 150,
          height: 150,
          backgroundColor: '#ffaaaa',
          borderRadius: 30,
          scale: scale,
        }}
      >
        <motion.img
          src={props.items[props.index]}
          className="w-full h-full pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

export default function Stack() {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState<number | string>('100%');

  return (
    <div className="flex w-screen h-96 justify-center items-center overflow-hidden">
      <motion.div style={{ width: 150, height: 150, position: 'relative' }}>
        <AnimatePresence initial={false}>
          <Card
            index={index < images.length - 1 ? index + 1 : index - 1}
            key={index + 1}
            initial={{ scale: 0, y: 105, opacity: 0 }}
            animate={{ scale: 0.75, y: 30, opacity: 0.5 }}
            transition={{
              type: 'tween',
              scale: { duration: 0.2 },
              opacity: { duration: 0.4 },
            }}
            items={images}
          />
          <Card
            key={index}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              opacity: { duration: 0.2 },
            }}
            exitX={exitX}
            setExitX={setExitX}
            index={index}
            setIndex={setIndex}
            drag="x"
            items={images}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

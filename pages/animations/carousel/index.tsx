import * as React from 'react';
import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { wrap } from 'popmotion';

export const images = [
  'https://images.unsplash.com/photo-1453301109223-3e2085a1e69d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3088&q=80',
  'https://images.unsplash.com/photo-1561917443-6c5a9a4fca6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3086&q=80',
  'https://images.unsplash.com/photo-1649785118522-34139e0d0385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3063&q=80',
  'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      translateX: '0',
      rotateY: '0',
      scale: 0.8,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    translateX: '0',
    rotateY: '-180deg',
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      translateX: '0',
      rotateY: '0',
      scale: 0.8,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Carousel() {
  const [[page, direction], setPage] = useState([1, 1]);
  const [active, setActive] = useState(1);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleMoveEnd = (
    i: number,
    x: number,
    _y: number,
    _offsetX: number,
    _velocityX: number
  ) => {
    // console.log('i: ', i);
    // console.log('x: ', x);
    // console.log('y: ', y);

    // const swipe = swipePower(offsetX, velocityX);
    // if (swipe < -swipeConfidenceThreshold) {
    //   paginate(1);
    // } else if (swipe > swipeConfidenceThreshold) {
    //   paginate(-1);
    // }

    const distanceToSwipe = 100;
    const containerWidth =
      constraintsRef.current?.offsetWidth ?? window.innerWidth;

    console.log('container width: ', containerWidth);
    console.log('x: ', x);
    console.log(containerWidth / 2 + distanceToSwipe);
    console.log(containerWidth / 2 - distanceToSwipe);

    if (x > containerWidth / 2 + distanceToSwipe) {
      paginate(i + 1);
      setActive(i + 1);
    }
    if (x < containerWidth / 2 - distanceToSwipe) {
      paginate(i + 1);
      setActive(i - 1);
    }
  };

  console.log('ACTIVE: ', active);
  console.log('PAGE: ', page);
  console.log('DIRECTION: ', direction);
  console.log('IMAGE INDEX: ', imageIndex);

  return 1 > 0 ? (
    <div
      className="flex relative w-screen h-[calc(100vh-259px)] justify-center items-center overflow-hidden bg-fuchsia-400"
      ref={constraintsRef}
    >
      <div
        style={{
          // width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(rgba(255,255,255,0),
                        rgba(255,255,255,0.3))`,
          perspective: 800,
          display: 'flex',
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={page}
            className="flex"
            style={{ x: x, y: y, rotateX: rotateX, rotateY: rotateY }}
            drag="x"
            dragSnapToOrigin
            dragElastic={0.6}
            onDragEnd={(e, { point, offset, velocity }) => {
              handleMoveEnd(active, point.x, point.y, offset.x, velocity.x);
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <motion.img
              src={images[page - 1 ?? 0]}
              custom={direction}
              style={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: 30,
                backgroundColor: '#fff',
                // left: -25,
                top: -25,
                position: 'relative',
                // x: x,
                // y: y,
                // rotateX: rotateX,
                // rotateY: rotateY,
              }}
            />
            <motion.img
              src={images[imageIndex]}
              custom={direction}
              style={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: 30,
                backgroundColor: '#fff',
                // left: -25,
                top: -25,
                position: 'relative',
                cursor: 'grab',
              }}
              // drag="x"
              // dragSnapToOrigin
              // dragElastic={0.6}
              // onDragEnd={(e, { point, offset, velocity }) => {
              //   handleMoveEnd(active, point.x, point.y, offset.x, velocity.x);
              // }}
              // whileTap={{ cursor: 'grabbing' }}
            />
            <motion.img
              src={images[page + 1 ?? 0]}
              custom={direction}
              style={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: 30,
                backgroundColor: '#fff',
                // left: -25,
                top: -25,
                position: 'relative',
                // x: x,
                // y: y,
                // rotateX: rotateX,
                // rotateY: rotateY,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  ) : (
    <div className="flex relative w-screen h-screen justify-center items-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute max-w-full"
        />
      </AnimatePresence>
      <div
        className="absolute top-[calc(50% - 20px)] bg-white rounded-full w-10 h-10 flex justify-center items-center select-none cursor-pointer font-bold text-lg z-[2] left-[10px] -scale-[1]"
        onClick={() => paginate(1)}
      >
        {'‣'}
      </div>
      <div
        className="absolute top-[calc(50% - 20px)] bg-white rounded-full w-10 h-10 flex justify-center items-center select-none cursor-pointer font-bold text-lg z-[2] right-[10px]"
        onClick={() => paginate(-1)}
      >
        {'‣'}
      </div>
    </div>
  );
}

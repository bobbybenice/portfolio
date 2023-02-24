import { useState } from 'react';
import {
  CARD_WIDTH,
  CarouselCard,
} from 'components/CarouselCard/CarouselCardComponent';
import { carouselData } from 'data';
import { AnimatePresence, motion } from 'framer-motion';

export default function InfiniteCarousel() {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState<string | number>('100%');
  const [expanded, setExpanded] = useState(false);

  const handleSetIndex = (index: number) => {
    setIndex(index);
  };

  const prevIndex = index > 0 ? index - 1 : carouselData.length - 1;

  const nextIndex = index < carouselData.length - 1 ? index + 1 : 0;

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-8 justify-center items-center overflow-hidden">
      <motion.div
        style={{
          width: CARD_WIDTH,
          height: CARD_WIDTH,
          position: 'relative',
        }}
      >
        <AnimatePresence custom={index}>
          <CarouselCard
            type="sidekick"
            key={prevIndex}
            initial={{ scale: 0, x: 200, opacity: 0 }}
            animate={{ scale: 0.75, x: 100, opacity: 0.5 }}
            transition={{
              type: 'tween',
              scale: { duration: 0.2 },
              opacity: { duration: 0.4 },
            }}
            src={carouselData[prevIndex].image}
          />
          <CarouselCard
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
            prev={prevIndex}
            next={nextIndex}
            onClick={() => setExpanded(!expanded)}
          />
          <CarouselCard
            type="sidekick"
            key={nextIndex}
            initial={{ scale: 0, x: -200, opacity: 0 }}
            animate={{ scale: 0.75, x: -100, opacity: 0.5 }}
            transition={{
              type: 'tween',
              scale: { duration: 0.2 },
              opacity: { duration: 0.4 },
            }}
            src={carouselData[nextIndex].image}
          />
        </AnimatePresence>
      </motion.div>
      {expanded && (
        <motion.div
          key={index}
          layoutId={carouselData[index].image}
          className="w-screen h-screen fixed top-4 lg:top-0 lg:w-[50vw] lg:h-[50vw] rounded-lg bg-cover bg-center bg-no-repeat z-50 overflow-hidden lg:relative flex justify-center items-center"
          style={{
            backgroundColor: carouselData[index].color,
          }}
        >
          <motion.div className="absolute w-full h-full bg-white/90 -z-10" />
          <motion.h1
            layoutId={`${carouselData[index].image}-button`}
            onClick={() => setExpanded(false)}
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

      {/* TODO: add toggle for overflow hidden */}
    </div>
  );
}

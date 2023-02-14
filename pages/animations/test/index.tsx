import React, { useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { wrap } from 'popmotion';

import { images } from '../carousel';

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

const Test = () => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  const activeImageIndex = wrap(0, images.length, imageCount);

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId: number) => {
    let changeDirection;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
      setImageCount([imageId, changeDirection]);
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
      setImageCount([imageId, changeDirection]);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center my-6 mx-0">
        <div className="relative h-[500px] w-[350px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              style={{
                backgroundImage: `url(${images[activeImageIndex]})`,
              }}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="absolute w-full h-full bg-cover bg-no-repeat bg-center will-change-transform hover:cursor-pointer active:cursor-grabbing"
            />
          </AnimatePresence>
        </div>

        <div className="buttons">
          <button onClick={() => swipeToImage(-1)}>PREV</button>
          <button onClick={() => swipeToImage(1)}>NEXT</button>
        </div>
      </div>

      <div className="thumbnails">
        {images.map((image) => (
          <div
            key={image}
            onClick={() => skipToImage(images.indexOf(image))}
            className="thumbnail-container"
          >
            <img src={image} alt="Musician" />
            <div
              className={`active-indicator ${
                images.indexOf(image) === activeImageIndex ? 'active' : null
              }`}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Test;

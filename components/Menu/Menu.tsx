import { useRef, useState } from 'react';
import { Icon } from 'components';
import {
  AnimatePresence,
  motion,
  PanInfo,
  Transition,
  useAnimationControls,
} from 'framer-motion';
import Link from 'next/link';

interface IMenu {
  links: Array<{ label: string; href: string }>;
}
const variants = {
  initial: {
    translateX: '100%',
    opacity: 0,
  },
  open: {
    translateX: '0',
    opacity: 1,
  },
  exit: {
    translateX: '100%',
    opacity: 0,
  },
};

const closedClipPath = 'circle(48px at calc(100% - 16px) 16px)';
const openClipPath = `circle(1200px at calc(100% - 48px) 40px)`;
const openTransition: Transition = {
  type: 'spring',
  stiffness: 30,
  damping: 6,
};
const closeTransition: Transition = {
  type: 'tween',
  duration: 0.3,
};

const swipeConfidenceThreshold = 10000;

export const Menu = (props: IMenu) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const _sidebar = {
    open: () => ({
      clipPath: openClipPath,
      transition: openTransition,
    }),
    closed: {
      clipPath: closedClipPath,
      transition: closeTransition,
    },
  };
  const controls = useAnimationControls();

  const handleClose = () => {
    setOpen(false);
    controls.start({ clipPath: closedClipPath }, closeTransition);
  };

  const handleOpen = () => {
    setOpen(true);
    controls.start({ clipPath: openClipPath }, openTransition);
  };

  return 1 > 0 ? (
    <div ref={ref} className="overflow-hidden w-screen h-screen absolute">
      <AnimatePresence mode="popLayout">
        {open && (
          <motion.div
            key="open"
            onClick={handleClose}
            className="absolute top-2 right-2 z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
          >
            <Icon name="CloseSimple" color="white" className="fill-white" />
          </motion.div>
        )}
        {!open && (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            onClick={handleOpen}
            className="absolute top-2 right-2 z-40 bg-fuchsia-500 rounded-full"
            drag="y"
            // dragConstraints={{ top: 0, left: 0, right: 0 }}
            onDrag={(e: any, info: PanInfo) => {
              // if (info.point.y <= 200) {
              //   controls.start(
              //     {
              // clipPath: `circle(${
              //   info.offset.y + 24
              // }px at calc(100% - 24px) 24px)`,
              //     },
              //     {}
              //   );
              // } else {
              //   controls.start(
              //     {
              //       clipPath: openClipPath,
              //     },
              //     {}
              //   );
              // }
              controls.start({
                clipPath: `circle(${
                  info.offset.y + 24
                }px at calc(100% - 24px) 24px)`,
              });
            }}
            onDragEnd={(e: any, info: PanInfo) => {
              if (info.point.y > 200) {
                handleOpen();
              } else {
                handleClose();
              }
            }}
            dragSnapToOrigin
          >
            <Icon name="Card" color="white" className="fill-white" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-[calc(100vw-3.75rem)] bg-fuchsia-500 z-30 px-10 py-10 flex justify-end items-end"
        initial={{
          clipPath: closedClipPath,
        }}
        animate={controls}
      >
        {open && (
          <ul>
            {props.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="block"
                onClick={handleClose}
              >
                <motion.li
                  className="text-white py-2 mb-px"
                  initial={{ opacity: 0, translateY: -50 }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    transition: { delay: 0.1 * (i + 1) },
                  }}
                >
                  {link.label}
                </motion.li>
              </Link>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  ) : (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          key="closed"
          // layoutId="menu"
          className="flex justify-center items-center w-12 h-12 bg-fuchsia-500 rounded-bl-3xl absolute right-0 top-0 z-20"
          onClick={() => setOpen(true)}
        >
          {open ? (
            <motion.div
              layoutId="menu-icon"
              className="absolute top-2 right-2 z-30"
              onClick={() => setOpen(false)}
            >
              <Icon name="CloseSimple" color="white" className="fill-white" />
            </motion.div>
          ) : (
            <motion.div
              // layoutId="menu-icon"
              className="absolute top-2 right-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { delay: 0.2, duration: 1 },
              }}
            >
              <Icon name="Card" color="white" className="fill-white" />
            </motion.div>
          )}
        </motion.div>
        {open && (
          <motion.div
            key="open"
            // layoutId="menu"
            variants={variants}
            initial="initial"
            animate={open ? 'open' : 'exit'}
            exit="exit"
            className="flex flex-col h-screen bg-fuchsia-500 absolute top-0 right-0 z-20 w-4/5 px-4 py-8 justify-end items-end text-end"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.h2
              initial={{ opacity: 0, translateY: -100 }}
              animate={{
                opacity: 1,
                translateY: 0,
                transition: { delay: 0.2 },
              }}
              className="text-white text-2xl mb-8"
            >
              Bobby´s playground
            </motion.h2>
            <ul>
              {props.links.map((link, i) => (
                <Link key={link.href} href={link.href} className="block">
                  <motion.li
                    className="text-white py-2 mb-px"
                    initial={{ opacity: 0, translateY: -50 }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                      transition: { delay: 0.1 * (i + 1) },
                    }}
                  >
                    {link.label}
                  </motion.li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

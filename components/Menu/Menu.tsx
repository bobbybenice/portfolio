import { useCallback, useEffect, useRef, useState } from 'react';
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

export const Menu = (props: IMenu) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const handleClose = useCallback(() => {
    setOpen(false);
    controls.start({ clipPath: closedClipPath }, closeTransition);
  }, [controls]);

  const handleOpen = () => {
    setOpen(true);
    controls.start({ clipPath: openClipPath }, openTransition);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as Element;
      if (open && !ref?.current?.contains(target)) {
        handleClose();
      }
    },
    [handleClose, open]
  );

  const handleScroll = useCallback(() => {
    if (window.scrollY > 40) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    if (!open) {
      body.classList.remove('no-scroll');
      return;
    }

    // TODO: not working on iphone
    body.classList.add('no-scroll');

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleClickOutside, handleScroll, open]);

  return (
    <>
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
              dragConstraints={{ top: 0, left: 0, right: 0 }}
              onDrag={(e: any, info: PanInfo) => {
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
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            className="bg-black/75 absolute top-0 left-0 w-screen h-screen z-20"
          />
        )}
      </AnimatePresence>
    </>
  );
};

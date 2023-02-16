import { useCallback, useEffect, useState } from 'react';
import { Icon } from 'components';
import {
  AnimatePresence,
  motion,
  PanInfo,
  Transition,
  useAnimationControls,
  useMotionValue,
  useTransform,
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
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('');
  const controls = useAnimationControls();
  const y = useMotionValue(0);
  const yInput = [0, 100, 200];
  const backdropBackground = useTransform(y, yInput, [
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.75)',
  ]);

  const handleClose = useCallback(() => {
    setOpen(false);
    controls.start({ clipPath: closedClipPath }, closeTransition);
  }, [controls]);

  const handleOpen = () => {
    controls.start({ clipPath: openClipPath }, openTransition);
    setOpen(true);
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 40) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    if (!open) {
      body.classList.remove('overflow-hidden', 'relative', 'h-full');
      html.classList.remove('overflow-hidden', 'relative', 'h-full');
      return;
    }

    body.classList.add('overflow-hidden', 'relative', 'h-full');
    html.classList.add('overflow-hidden', 'relative', 'h-full');
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, open]);

  return (
    <>
      <motion.div
        id="header"
        className="w-screen h-auto flex justify-end relative"
      >
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              key="open"
              onClick={handleClose}
              className="fixed top-0 right-0 z-40 cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
            >
              <Icon
                name="CloseSimple"
                color="white"
                className="fill-white w-12 h-12"
              />
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
              className="fixed top-0 right-0 z-40 bg-fuchsia-500 rounded-full cursor-pointer"
              drag="y"
              dragConstraints={{ top: 0, left: 0, right: 0 }}
              onDrag={(e: any, info: PanInfo) => {
                if (!isDragging) {
                  setIsDragging(true);
                }
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

                setIsDragging(false);
              }}
              dragSnapToOrigin
              style={{ y }}
            >
              <Icon
                name="Card"
                color="white"
                className="fill-white w-12 h-12"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-[calc(100vw-3.75rem)] bg-fuchsia-500 z-30 px-10 py-10 flex justify-end items-end"
        initial={{
          clipPath: closedClipPath,
        }}
        animate={controls}
        style={{
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {open && (
          <ul className="pointer-events-auto text-right">
            {props.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="block"
                onClick={handleClose}
              >
                <motion.li
                  className="text-white py-2 mb-px relative z-10 inline-block"
                  initial={{ opacity: 0, translateY: -50 }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    transition: { delay: 0.1 * (i + 1) },
                  }}
                  onHoverStart={() => setHoveredLink(link.href)}
                >
                  {link.href === hoveredLink && (
                    <motion.div
                      className="w-[calc(100%+1rem)] h-full bg-fuchsia-300 rounded-full absolute top-0 -right-2 -z-10"
                      layoutId="activeLink"
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                  {link.label}
                </motion.li>
              </Link>
            ))}
          </ul>
        )}
      </motion.div>
      <AnimatePresence>
        {(open || isDragging) && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: open || isDragging ? 1 : 0 }}
            className="bg-black/75 absolute top-0 left-0 w-screen h-screen z-20"
            onClick={handleClose}
            style={{
              background: isDragging ? backdropBackground : 'rbga(0,0,0,0.75)',
            }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

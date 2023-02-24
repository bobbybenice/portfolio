import { useCallback, useEffect, useState } from 'react';
import { Icon } from 'components';
import {
  AnimatePresence,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';

interface IMenu {
  links: Array<{ label: string; href: string }>;
}

export const Menu = (props: IMenu) => {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thresholdIsMet, setThresholdIsMet] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('');
  const y = useMotionValue(0);
  const yInput = [0, 100, 200];
  const menuThresholdScale = useTransform(y, [0, 180, 200], [1, 0, 1.2]);
  const menuOpacity = useTransform(y, yInput, [0, 0.5, 1]);
  const menuTranslateY = useTransform(y, yInput, ['100%', '100%', '0%']);
  const borderRadiusHandle = useTransform(y, yInput, [
    '50% 50% 48% 52% / 64% 65% 35% 36%',
    '50% 50% 48% 52% / 64% 65% 35% 36%',
    '50% 50% 48% 52% / 50% 52% 48% 50%',
  ]);
  const borderRadiusHandleBg = useTransform(y, yInput, [
    '0%',
    '50% 50% 48% 52% / 100% 100% 0% 0%',
    '50% 50% 48% 52% / 99% 99% 1% 1%',
  ]);
  const backdropBackground = useTransform(y, yInput, [
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.75)',
  ]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = () => {
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

  console.log(isDragging, open);

  return (
    <>
      <motion.div
        id="header"
        className="w-screen h-auto flex justify-end relative"
      >
        <motion.div
          className="fixed w-12 h-screen bg-fuchsia-500 z-40 origin-top right-0 top-8"
          style={{ y, borderRadius: borderRadiusHandleBg }}
          initial={{ translateY: '-100%' }}
        />
        <motion.div
          key="closed"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            scale: 0,
            opacity: 0,
          }}
          className="fixed -top-2 right-0 z-40 bg-fuchsia-500 rounded-full cursor-pointer h-16 flex justify-center items-end"
          drag={!open ? 'y' : undefined}
          dragConstraints={{ top: 0, left: 0, right: 0 }}
          onDrag={(e: any, info: PanInfo) => {
            if (!isDragging) {
              setIsDragging(true);
            }

            if (info.offset.y >= 200 && !thresholdIsMet) {
              setThresholdIsMet(true);
            }

            if (info.offset.y < 200 && thresholdIsMet) {
              setThresholdIsMet(false);
            }
          }}
          onDragEnd={(e: any, info: PanInfo) => {
            if (info.offset.y >= 200) {
              handleOpen();
            } else {
              handleClose();
            }
            setIsDragging(false);
          }}
          dragSnapToOrigin
          style={{
            y,
            borderRadius: borderRadiusHandle,
          }}
        >
          <AnimatePresence mode="popLayout">
            {!open && !isDragging && (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                onClick={handleOpen}
              >
                <Icon
                  name="Card"
                  color="white"
                  className="fill-white w-12 h-12"
                />
              </motion.div>
            )}
            {isDragging && !open && (
              <motion.div
                key="dragging"
                style={{ scale: menuThresholdScale }}
                className="w-12 h-12 flex justify-center items-center"
              >
                <div className="bg-white w-6 h-6 rounded-full" />
              </motion.div>
            )}
            {open && (
              <motion.div
                key="closed"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                onClick={handleClose}
              >
                <Icon
                  name="CloseSimple"
                  color="white"
                  className="fill-white w-12 h-12"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {/* {(open || isDragging) && ( */}
        <motion.div
          key="menu"
          className="fixed top-0 right-0 w-screen h-screen bg-fuchsia-500 z-30 flex justify-end items-end p-12 pb-20"
          initial={{ opacity: 0, translateY: '100%' }}
          exit={{ opacity: 0, translateY: '100%' }}
          style={
            isDragging
              ? {
                  opacity: menuOpacity,
                  translateY: menuTranslateY,
                  transformOrigin: 'top',
                }
              : {
                  opacity: open ? 1 : 0,
                }
          }
          animate={{
            opacity: open ? 1 : 0,
            translateY: open ? '0%' : '100%',
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
        {/* )} */}
      </AnimatePresence>
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

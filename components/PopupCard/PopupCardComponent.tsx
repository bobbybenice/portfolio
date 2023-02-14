import { Icon, Label } from 'components';
import { motion, PanInfo } from 'framer-motion';
import { TTeam } from 'helpers';
import Image from 'next/image';

type TPopupCardItem = TTeam & {
  onClose: () => void;
};

export const PopupCardComponent = ({
  name,
  icon,
  image,
  onClose,
  ...args
}: TPopupCardItem) => {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 200) {
      onClose();
    }
  };
  return (
    <motion.div
      className="h-[calc(100vh-1rem)] flex flex-col items-center gap-2 fixed top-4 left-0 right-0 bg-white pt-28 px-4 pb-4 overflow-hidden rounded-t-lg lg:top-[15vh] lg:h-[70vh] lg:w-96 lg:pt-36 lg:px-12 lg:pb-12 lg:rounded-lg lg:mx-auto z-40"
      layoutId={`${name}-popup`}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        layoutId={`card-icon-${name}-popup`}
        className="absolute top-4 right-4 cursor-pointer z-30"
        onClick={onClose}
      >
        <Icon name="Close" className="fill-black" />
      </motion.div>
      <motion.div
        layoutId={`image-${name}-popup`}
        className="w-full h-24 absolute top-0 left-0 after:content-[''] after:h-2 after:w-20 after:rounded-xl after:bg-white/75 after:absolute after:top-4 after:left-2/4 after:-translate-x-2/4 z-20"
      >
        <Image
          alt="basketball"
          src={image}
          width={100}
          height={100}
          className="w-full h-full object-cover"
          placeholder="blur"
          blurDataURL={args.placeholderImage}
        />
      </motion.div>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        className="flex flex-col items-center h-full"
      >
        <motion.div layoutId={`icon-${name}-popup`} className="mt-12 lg:mt-0">
          <Icon className="w-28 h-28" name={icon} width={28} height={28} />
        </motion.div>
        <motion.div layoutId={`name-${name}-popup`}>
          <Label text={name} type="h2" className="text-2xl" />
        </motion.div>
        <motion.div
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              transition: {
                when: 'beforeChildren',
                delayChildren: 0.1,
                staggerChildren: 0.1,
              },
            },
          }}
          animate="show"
          className="w-full flex flex-col gap-4 items-center pt-8"
        >
          <motion.div
            className="flex gap-2 overflow-hidden"
            key="city"
            variants={{
              hidden: {
                opacity: 0,
                translateY: '2rem',
                transition: {
                  duration: 0.01,
                },
              },
              show: {
                opacity: 1,
                translateY: 0,
              },
            }}
          >
            <Label text="City:" type="h3" />{' '}
            <Label text={args.city} type="h3" />
          </motion.div>
          <motion.div
            className="flex gap-2 overflow-hidden"
            key="conference"
            variants={{
              hidden: {
                opacity: 0,
                translateY: '2rem',
                transition: {
                  duration: 0.01,
                },
              },
              show: {
                opacity: 1,
                translateY: 0,
              },
            }}
          >
            <Label text="Conference:" type="h3" />{' '}
            <Label text={args.conference} type="h3" />
          </motion.div>
          <motion.div
            className="flex gap-2 overflow-hidden"
            key="division"
            variants={{
              hidden: {
                opacity: 0,
                translateY: '2rem',
                transition: {
                  duration: 0.01,
                },
              },
              show: {
                opacity: 1,
                translateY: 0,
              },
            }}
          >
            <Label text="Division:" type="h3" />{' '}
            <Label text={args.division} type="h3" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

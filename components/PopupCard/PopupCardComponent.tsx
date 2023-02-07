import { Icon, Label } from 'components';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { TTeam } from 'pages/nba/types';

import styles from './PopupCardComponent.module.scss';

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
      className={styles.popupCard}
      layoutId={`${name}-popup`}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        layoutId={`card-icon-${name}-popup`}
        className={styles.close}
        onClick={onClose}
      >
        <Icon name="Close" color="black" />
      </motion.div>
      <motion.div
        layoutId={`image-${name}-popup`}
        className={styles.imageContainer}
      >
        <Image
          alt="basketball"
          src={image}
          width={100}
          height={100}
          className={styles.image}
          placeholder="blur"
          blurDataURL={args.placeholderImage}
        />
      </motion.div>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        className={styles.content}
      >
        <motion.div layoutId={`icon-${name}-popup`}>
          <Icon className={styles.icon} name={icon} width={28} height={28} />
        </motion.div>
        <motion.div
          layoutId={`name-${name}-popup`}
          className={styles.nameContainer}
        >
          <Label text={name} type="h2" />
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
          className={styles.details}
        >
          <motion.div
            className={styles.row}
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
            className={styles.row}
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
            className={styles.row}
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
      {/* <motion.div
        className={styles.blob}
        layoutId={`card-blob-${name}-popup`}
      /> */}
    </motion.div>
  );
};

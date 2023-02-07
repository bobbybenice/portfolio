import { Icon, Label } from 'components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TTeam } from 'pages/nba/types';

import styles from './CheckListItemComponent.module.scss';

type TCheckListItemProps = TTeam & {
  onClick: () => void;
};
export const CheckListItemComponent = ({
  name,
  image,
  icon,
  onClick,
  ...args
}: TCheckListItemProps) => (
  <motion.div
    key={name}
    className={styles.checkListItem}
    onClick={onClick}
    layoutId={`${name}-popup`}
    whileTap={{ scale: 0.95 }}
    initial="hidden"
    variants={{
      show: {
        opacity: 1,
        translateY: 0,
      },
      hidden: {
        opacity: 0,
        translateY: '2rem',
      },
    }}
    animate="show"
  >
    <motion.div
      layoutId={`image-${name}-popup`}
      className={styles.imageContainer}
    >
      <Image
        alt="basketball"
        src={image}
        width={1000}
        height={1000}
        className={styles.image}
        placeholder="blur"
        blurDataURL={args.placeholderImage}
      />
    </motion.div>
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
      layoutId={`card-icon-${name}-popup`}
      className={styles.cardIcon}
    >
      <Icon name="Card" />
    </motion.div>
    {/* <motion.div layoutId={`card-blob-${name}-popup`} className={styles.blob} /> */}
  </motion.div>
);

import { Icon, Label } from 'components';
import { TAvailableIcons } from 'components/Icon/IconComponent';
import { motion } from 'framer-motion';

import styles from './CheckListItemComponent.module.scss';

type TCheckListItemProps = {
  active: boolean;
  onClick: () => void;
  title: string;
  icon: TAvailableIcons;
  subtitle?: string;
};
export const CheckListItemComponent = ({
  title,
  subtitle,
  icon,
  onClick,
}: TCheckListItemProps) => (
  <motion.div
    key={title}
    className={styles.checkListItem}
    onClick={onClick}
    layoutId={`${title}-popup`}
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
    <motion.div layoutId={`icon-${title}-popup`}>
      <Icon className={styles.icon} name={icon} width={28} height={28} />
    </motion.div>
    <motion.div
      layoutId={`title-${title}-popup`}
      className={styles.titleContainer}
    >
      <Label text={title} type="h2" />
    </motion.div>
    <motion.div
      layoutId={`card-icon-${title}-popup`}
      className={styles.cardIcon}
    >
      <Icon name="Card" />
    </motion.div>
    {subtitle && <Label text={subtitle} type="h3" />}
    <motion.div
      layoutId={`card-content-${title}-popup`}
      className={styles.bottomLine}
    />
  </motion.div>
);

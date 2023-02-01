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
    className={styles.checkListItem}
    onClick={onClick}
    layoutId={`${title}-popup`}
  >
    <motion.div layoutId={`icon-${title}-popup`}>
      <Icon className={styles.icon} name={icon} width={28} height={28} />
    </motion.div>
    <motion.div layoutId={`title-${title}-popup`}>
      <Label text={title} type="h2" />
    </motion.div>
    {subtitle && <Label text={subtitle} type="h3" />}
  </motion.div>
);

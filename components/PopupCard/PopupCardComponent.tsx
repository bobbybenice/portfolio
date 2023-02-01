import { Icon, Label } from 'components';
import { TItem } from 'components/SelectList/SelectListComponent';
import { motion } from 'framer-motion';
import { TTeam } from 'pages/nba/types';

import styles from './PopupCardComponent.module.scss';

type TPopupCardItem = TItem &
  TTeam & {
    onClose: () => void;
  };

export const PopupCardComponent = ({
  title,
  icon,
  onClose,
  ...args
}: TPopupCardItem) => {
  return (
    <motion.div className={styles.popupCard} layoutId={`${title}-popup`}>
      <motion.div layoutId={`icon-${title}-popup`}>
        <Icon className={styles.icon} name={icon} width={28} height={28} />
      </motion.div>
      <motion.div layoutId={`title-${title}-popup`}>
        <Label text={title} type="h2" />
      </motion.div>
      <motion.div
        layoutId={`card-icon-${title}-popup`}
        className={styles.close}
        onClick={onClose}
      >
        <Icon name="CloseSimple" color="black" />
      </motion.div>

      <motion.div
        layoutId={`card-content-${title}-popup`}
        className={styles.line}
      />
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
        className={styles.content}
      >
        <motion.div
          className={styles.row}
          key="city"
          variants={{
            hidden: {
              opacity: 0,
              translateY: '2rem',
            },
            show: {
              opacity: 1,
              translateY: 0,
            },
          }}
        >
          <Label text="City:" type="h3" /> <Label text={args.city} type="h3" />
        </motion.div>
        <motion.div
          className={styles.row}
          key="conference"
          variants={{
            hidden: {
              opacity: 0,
              translateY: '2rem',
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
  );
};

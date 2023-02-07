import { CheckListItem } from 'components';
import { motion } from 'framer-motion';
import { TTeam } from 'pages/nba/types';

import styles from './SelectListComponent.module.scss';

type TSelectListProps = {
  /** Items to display in list */
  items: Array<TTeam>;
  /** Click event for each item in list */
  onClick: (_item?: TTeam) => void;
  /** Selected item */
  selected?: TTeam;
};

export const SelectListComponent = ({
  items,
  selected,
  onClick,
}: TSelectListProps) => {
  return (
    <>
      <motion.div
        initial="hidden"
        variants={{
          hidden: {
            opacity: 0,
          },
          show: {
            opacity: 1,
          },
        }}
        animate="show"
        className={styles.selectList}
      >
        {items.map((item, i) => {
          return (
            <motion.div
              key={item.name}
              variants={{
                hidden: {
                  opacity: 0,
                  translateY: '2rem',
                },
                show: {
                  opacity: 1,
                  translateY: 0,
                  transition: {
                    delay: 0.05 * i,
                  },
                },
              }}
              className={styles.checkListItemContainer}
            >
              <CheckListItem onClick={() => onClick(item)} {...item} />
            </motion.div>
          );
        })}
      </motion.div>
      {selected && (
        <motion.div
          onClick={() => onClick(undefined)}
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </>
  );
};

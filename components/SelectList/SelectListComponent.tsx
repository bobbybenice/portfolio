import { CheckListItem } from 'components';
import { TAvailableIcons } from 'components/Icon/IconComponent';
import fastDeepEqual from 'fast-deep-equal';
import { motion } from 'framer-motion';

import styles from './SelectListComponent.module.scss';

export type TItem = {
  title: string;
  icon: TAvailableIcons;
  subtitle?: string;
};

type TSelectListProps = {
  /** Items to display in list */
  items: Array<TItem>;
  /** Click event for each item in list */
  onClick: (_item?: TItem) => void;
  /** Selected item */
  selected?: TItem;
};

export const SelectListComponent = ({
  items,
  selected,
  onClick,
}: TSelectListProps) => {
  return (
    <>
      <div className={styles.selectList}>
        {items.map((item, i) => {
          const active = fastDeepEqual(selected, item);

          return (
            <CheckListItem
              key={i}
              onClick={() => onClick(item)}
              active={active}
              {...item}
            />
          );
        })}
      </div>
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

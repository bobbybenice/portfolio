import { CheckListItem } from 'components';
import { motion } from 'framer-motion';
import { TTeam } from 'helpers';

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
        className="relative flex flex-col lg:flex-row gap-4 lg:gap-2 lg:flex-wrap"
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
              className="relative lg:flex lg:flex-1 lg:basis-[calc(100%/3-1rem)]"
            >
              <CheckListItem onClick={() => onClick(item)} {...item} />
            </motion.div>
          );
        })}
      </motion.div>
      {selected && (
        <motion.div
          onClick={() => onClick(undefined)}
          className="absolute bg-black/75 w-full h-full top-0 left-0 right-0 bottom-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </>
  );
};

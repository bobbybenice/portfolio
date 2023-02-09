import { Icon, Label } from 'components';
import { motion } from 'framer-motion';
import { TTeam } from 'helpers';
import Image from 'next/image';

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
    className="relative flex items-start gap-2 pt-16 pb-2 px-4 bg-gradient-to-t from-black to-green-800 cursor-pointer overflow-hidden lg:flex-1 lg:basis-[calc(100%/3-1rem)] rounded-l"
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
      className="absolute top-0 left-0 h-2/4 w-full z-0"
    >
      <Image
        alt="basketball"
        src={image}
        width={1000}
        height={1000}
        className="w-full h-full object-cover"
        placeholder="blur"
        blurDataURL={args.placeholderImage}
      />
    </motion.div>
    <motion.div layoutId={`icon-${name}-popup`} className="z-10">
      <Icon name={icon} width={28} height={28} />
    </motion.div>
    <motion.div layoutId={`name-${name}-popup`} className="z-10 text-white">
      <Label text={name} type="h2" />
    </motion.div>
    <motion.div layoutId={`card-icon-${name}-popup`} className="ml-auto z-10">
      <Icon name="Card" color="white" className="fill-white" />
    </motion.div>
  </motion.div>
);

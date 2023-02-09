import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const LayoutComponent = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="pt-8"
    >
      {children}
    </motion.div>
  );
};

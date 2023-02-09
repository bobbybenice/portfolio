import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '../styles/globals.scss';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

const animation = {
  variants: {
    initial: {
      opacity: 0,
      translateY: '100vh',
      scaleY: 0.4,
    },
    animate: {
      opacity: 1,
      translateY: '0vh',
      scaleY: 1,
    },
    exit: {
      opacity: 0,
      translateY: '100vh',
      scaleY: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={router.asPath}
          className="page-wrap"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animation.variants}
          transition={animation.transition}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ApolloProvider>
  );
}

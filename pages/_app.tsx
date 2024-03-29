import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Menu } from 'components';
import { AnimatePresence, LazyMotion, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import '../styles/globals.css';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

const animation = {
  variants: {
    initial: {
      opacity: 0,
      // translateY: '100vh',
      // scaleY: 0.4,
    },
    animate: {
      opacity: 1,
      // translateY: '0vh',
      // scaleY: 1,
    },
    exit: {
      opacity: 0,
      // translateY: '100vh',
      // scaleY: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

const loadFeatures = () =>
  import('../framer-features.js').then((res) => res.default);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <LazyMotion features={loadFeatures}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Menu
          links={[
            {
              label: 'Drag to snap',
              href: `${router.basePath}/animations/drag-to-snap`,
            },
            {
              label: 'Pop card',
              href: `${router.basePath}/animations/pop-layout`,
            },
            {
              label: 'Infinite carousel',
              href: `${router.basePath}/animations/infinite-carousel`,
            },
            {
              label: 'List',
              href: `${router.basePath}/animations/animated-list`,
            },
          ]}
        />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation.variants}
            transition={animation.transition}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </LazyMotion>
    </ApolloProvider>
  );
}

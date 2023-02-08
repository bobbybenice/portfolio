import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          backgroundColor: 'lightblue',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <ul>
          <Link href="gestures" style={{ fontSize: '1.25rem' }}>
            <motion.li
              style={{
                display: 'flex',
                padding: '2rem 4rem',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                  'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
                borderRadius: '1.25rem',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Gestures
            </motion.li>
          </Link>
        </ul>
      </main>
    </div>
  );
}

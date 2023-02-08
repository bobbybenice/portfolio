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
          <li>
            <Link href="gestures">Gestures</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}

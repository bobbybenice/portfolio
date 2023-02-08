import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Icon } from 'components';
import { motion } from 'framer-motion';
import { TPlayer } from 'helpers';
import Link from 'next/link';

import styles from './players.module.scss';

export default function Players() {
  const [players, setPlayers] = useState<TPlayer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const fetchPlayers = async () => {
    setLoading(true);

    await axios
      .get(`https://www.balldontlie.io/api/v1/players?per_page=100`)
      .then((res) => {
        if (res.data.data) {
          setLoading(false);
          setPlayers(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchPlayers();
    searchRef.current?.focus();
  }, []);

  const getColor = useCallback(() => {
    const colorSet = [
      'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, rgb(211, 9, 225) 100%)',
      'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
      'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
    ];
    return colorSet[Math.floor(Math.random() * colorSet.length)];
  }, []);

  const foundMatch = useCallback((player?: TPlayer, val?: string) => {
    if (!player || (!val && val !== '')) {
      return false;
    }

    const str = val.toLowerCase();
    const name = (player.first_name + ' ' + player.last_name).toLowerCase();
    const reversedName = (
      player.last_name +
      ' ' +
      player.first_name
    ).toLowerCase();

    return name.includes(str) || reversedName.includes(str);
  }, []);

  const filteredPlayers = useMemo(
    () =>
      players.filter((player) => {
        return foundMatch(player, searchQuery);
      }),
    [foundMatch, players, searchQuery]
  );

  return (
    <div className={styles.players}>
      <div
        style={{
          display: 'flex',
          width: 'auto',
          margin: '4rem auto',
          justifyContent: 'center',
          gap: '1rem',
          position: 'relative',
        }}
      >
        <input
          ref={searchRef}
          style={{
            border: '1px solid gray',
            borderRadius: '1rem',
            outline: 'none',
            padding: '0.5rem 1rem',
            margin: '0 3rem',
          }}
          disabled={loading}
          placeholder="Search player.."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setSearchQuery('')}
          disabled={loading}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'none',
            borderRadius: '1rem',
            padding: 0,
          }}
        >
          <Icon name="Close" color={loading ? 'epiroc-warm-grey-3' : 'black'} />
        </button>
      </div>
      <motion.div
        className={styles.list}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: (i = { delay: 1, stagger: 1 }) => ({
            opacity: 1,
            transition: {
              when: 'beforeChildren',
              delayChildren: i?.delay ? i.delay * 0.2 : 0.2,
              staggerChildren: i?.stagger ? i?.stagger * 0.2 : 0.2,
            },
          }),
        }}
      >
        <>
          {filteredPlayers.map((player: any) => (
            <Link
              href={`/nba/players/${player.id}`}
              key={player.id}
              className={styles.listItem}
            >
              <motion.div
                key={player.id}
                layout="preserve-aspect"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    damping: 20,
                    stiffness: 150,
                  },
                }}
                style={{
                  background: getColor(),
                }}
                className={styles.card}
              >
                {player.first_name} {player.last_name}
              </motion.div>
            </Link>
          ))}
          {!filteredPlayers.length && (
            <motion.div
              layout="preserve-aspect"
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                color: 'black',
              }}
              className={styles.card}
            >
              {loading ? 'Loading...' : 'Nothing to see :('}
            </motion.div>
          )}
        </>
      </motion.div>
    </div>
  );
}

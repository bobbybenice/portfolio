import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Icon } from 'components';
import { motion } from 'framer-motion';
import { TPlayer } from 'helpers';
import Link from 'next/link';

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
    <div className="flex flex-col py-0 px-4 lg:w-5/12 lg:mx-auto">
      <div className="flex w-auto my-16 mx-auto justify-center gap-4 relative">
        <input
          ref={searchRef}
          className="border-solid border border-gray-500 py-2 px-4 rounded-3xl outline-none my-0 mx-12"
          disabled={loading}
          placeholder="Search player.."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setSearchQuery('')}
          disabled={loading}
          className="absolute top-2/4 right-0 -translate-y-2/4 border-none bg-none rounded-full p-0"
        >
          <Icon name="Close" className="fill-black" />
        </button>
      </div>
      <motion.div
        className="flex flex-wrap gap-4 mx-auto items-center justify-center min-w-[18vw]"
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
              className="flex flex-1 basis-[calc(100%/6-1rem)]"
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
                className="flex flex-1 items-center justify-center self-stretch py-8 px-12 text-center rounded-lg text-white"
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
              className="bg-white flex flex-1 items-center justify-center self-stretch py-8 px-12 text-center rounded-lg text-black border-solid border border-black"
            >
              {loading ? 'Loading...' : 'Nothing to see :('}
            </motion.div>
          )}
        </>
      </motion.div>
    </div>
  );
}

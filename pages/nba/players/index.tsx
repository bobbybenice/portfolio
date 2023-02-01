import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { useDebounce } from '../../../helpers';
import { TPlayer } from '../types';

export default function Players() {
  const [players, setPlayers] = useState<TPlayer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery, 600);

  const fetchPlayers = async () => {
    await axios
      .get(`https://www.balldontlie.io/api/v1/players?per_page=100`)
      .then((res) => {
        if (res.data.data) {
          setPlayers(res.data.data);
        }
      });
  };

  const fetchPlayersByName = async (_name: string) => {
    await axios
      .get(`https://www.balldontlie.io/api/v1/players?search=${debouncedQuery}`)
      .then((res) => {
        if (res.data.data) {
          setPlayers(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchPlayersByName(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleChangeSearchQuery = (val: string) => {
    setSearchQuery(val);
  };

  if (!players) {
    return <h1>:: No players</h1>;
  }

  return (
    <div>
      <button onClick={fetchPlayers}>Clear</button>
      <button onClick={() => fetchPlayersByName('damian')}>
        Get players by name
      </button>
      <input
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '16px' }}>
        <div>
          {players.map((player: any) => (
            <div key={player.id}>
              <Link href={`/nba/players/${player.id}`}>
                {player.id} {player.first_name} {player.last_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

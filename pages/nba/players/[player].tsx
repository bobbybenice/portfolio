import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TStat } from '../types';

export default function Player() {
  const [playerStat, setPlayerStat] = useState<TStat[]>([]);

  const router = useRouter();
  const id = router.query.player;

  console.log(id);

  const fetchStatsByPlayer = async () => {
    await axios
      .get(
        `https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=${id}` // tatum player_ids[]=434 d dame player_ids[]=278
      )
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          setPlayerStat(res.data.data);
        }
      });
  };
  useEffect(() => {
    if (id) {
      fetchStatsByPlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (playerStat.length === 0) {
    return <h1>No stats for this player</h1>;
  }

  return (
    <div>
      {playerStat?.map((stat) => (
        <div key={stat.id} style={{ marginBottom: 16 }}>
          <div>
            Name: {stat.player.first_name} {stat.player.last_name}
          </div>
          <div>
            <div>{new Date(stat.game.date).toLocaleDateString()}</div>
          </div>
          <div>Points: {stat.pts}</div>
        </div>
      ))}
    </div>
  );
}

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TTeam } from '../types';

export default function Teams() {
  const [teams, setTeams] = useState<TTeam[]>([]);

  const fetchTeams = async () => {
    await axios
      .get(`https://www.balldontlie.io/api/v1/teams?per_page=100`)
      .then((res) => {
        if (res.data.data) {
          setTeams(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (!teams) {
    return <h1>:: No teams</h1>;
  }

  console.log(teams);

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div>
          {teams.map((team: any) => (
            <div key={team.id}>
              <Link href={`/nba/teams/${team.id}`}>{team.full_name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

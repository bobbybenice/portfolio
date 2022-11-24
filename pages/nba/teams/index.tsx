import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ListItem } from '../../../components';
import { getTeamLogo, getTeamLogoString } from '../../../helpers';
import { TTeam } from '../types';

export default function Teams() {
  const router = useRouter();

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

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div>
          {teams.map((team: any) => {
            const Logo = getTeamLogo(team.abbreviation);
            console.log(team.name);
            return (
              <ListItem
                key={team.id}
                title={team.full_name}
                subtitle={team.id}
                icon={getTeamLogoString(team.name)}
                onClick={() => router.push(`/nba/teams/${team.id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

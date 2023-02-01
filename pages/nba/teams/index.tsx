import { useEffect, useState } from 'react';
import axios from 'axios';
import { PopupCard, SelectList } from 'components';
import { TAvailableIcons } from 'components/Icon/IconComponent';
import { TItem } from 'components/SelectList/SelectListComponent';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { TTeam } from '../types';

export default function Teams() {
  const [teams, setTeams] = useState<TTeam[]>([]);
  const [active, setActive] = useState<TItem | undefined>();

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

  const activeTeam = teams.find((t) => t.name === active?.title);

  console.log(teams);
  return (
    <main
      style={{
        position: 'relative',
        backgroundColor: 'lightblue',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
        <AnimateSharedLayout>
          <SelectList
            items={teams.map((team) => ({
              title: team.name,
              icon: team.abbreviation as TAvailableIcons,
            }))}
            selected={active}
            onClick={setActive}
          />
          <AnimatePresence mode="sync">
            {active && activeTeam && (
              <PopupCard
                {...active}
                {...activeTeam}
                onClose={() => setActive(undefined)}
              />
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>
    </main>
  );
}

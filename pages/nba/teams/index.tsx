import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { PopupCard, SelectList } from 'components';
import { TAvailableIcons } from 'components/Icon/IconComponent';
import { AnimatePresence } from 'framer-motion';
import { getImageByCity, getPlaceholderImageURL } from 'helpers';

import { TTeam, TTeamAbbr } from '../types';

export default function Teams() {
  const [teams, setTeams] = useState<TTeam[]>([]);
  const [active, setActive] = useState<TTeam | undefined>();

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

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    if (!active) {
      body.classList.remove('no-scroll');
      return;
    }

    // TODO: not working on iphone
    body.classList.add('no-scroll');
  }, [active]);

  const teamsX = useMemo(
    () =>
      teams?.map((team) => ({
        ...team,
        image: getImageByCity(team.abbreviation as TTeamAbbr),
        icon: team.abbreviation as TAvailableIcons,
      })),
    [teams]
  );

  if (!teamsX) {
    return <h1>:: No teams</h1>;
  }

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <div style={{ maxWidth: '65rem', margin: '1rem auto' }}>
        <SelectList
          items={teamsX.map((x) => {
            const placeholder = getPlaceholderImageURL(x.image);
            return {
              ...x,
              placeholderImage: placeholder,
            };
          })}
          selected={active}
          onClick={setActive}
        />
        <AnimatePresence mode="sync">
          {active && (
            <PopupCard {...active} onClose={() => setActive(undefined)} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
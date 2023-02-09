import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { PopupCard, SelectList } from 'components';
import { TAvailableIcons } from 'components/Icon/IconComponent';
import {
  getImageByCity,
  getPlaceholderImageURL,
  TTeam,
  TTeamAbbr,
} from 'helpers';

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
      body.classList.remove('overflow-hidden');
      return;
    }

    // TODO: not working on iphone
    body.classList.add('overflow-hidden');
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
    <main className="flex flex-col p-4 lg:w-5/12 lg:my-8 lg:mx-auto">
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
      <>
        {active && (
          <PopupCard {...active} onClose={() => setActive(undefined)} />
        )}
      </>
    </main>
  );
}

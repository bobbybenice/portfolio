import { useEffect, useRef, useState } from 'react';
import { TAvailableIcons } from 'components/Icon/IconComponent';

import { TeamLogoIcons } from './assets';

export function useDebounce<T>(value: T, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  const didMountRef = useRef(false);

  useEffect(
    () => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export const TeamLogos: Record<
  TTeamAbbr,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  ATL: TeamLogoIcons.ATL,
  BOS: TeamLogoIcons.BOS,
  BKN: TeamLogoIcons.BKN,
  CHA: TeamLogoIcons.CHA,
  CHI: TeamLogoIcons.CHI,
  CLE: TeamLogoIcons.CLE,
  DAL: TeamLogoIcons.DAL,
  DEN: TeamLogoIcons.DEN,
  DET: TeamLogoIcons.DET,
  GSW: TeamLogoIcons.BOS,
  HOU: TeamLogoIcons.BOS,
  IND: TeamLogoIcons.BOS,
  LAC: TeamLogoIcons.BOS,
  LAL: TeamLogoIcons.BOS,
  MEM: TeamLogoIcons.BOS,
  MIA: TeamLogoIcons.BOS,
  MIL: TeamLogoIcons.BOS,
  MIN: TeamLogoIcons.BOS,
  NOP: TeamLogoIcons.BOS,
  NYK: TeamLogoIcons.BOS,
  OKC: TeamLogoIcons.BOS,
  ORL: TeamLogoIcons.BOS,
  PHI: TeamLogoIcons.BOS,
  PHX: TeamLogoIcons.BOS,
  POR: TeamLogoIcons.BOS,
  SAC: TeamLogoIcons.BOS,
  SAS: TeamLogoIcons.BOS,
  TOR: TeamLogoIcons.BOS,
  UTA: TeamLogoIcons.BOS,
  WAS: TeamLogoIcons.BOS,
};

export const TeamLogoStrings: TAvailableIcons[] = [
  'CHI',
  'CLE',
  'BOS',
  'ATL',
  'CHA',
  'DAL',
  'BKN',
  'DEN',
  'DET',
];

export function getTeamLogo(team: TTeamAbbr) {
  return TeamLogos[team];
}

export function getTeamLogoString(team: string): TAvailableIcons {
  const logo = TeamLogoStrings.find((x) => x === team);
  if (!logo) {
    return 'BOS';
  }
  return logo;
}

export function getImageByCity(city: TTeamAbbr): string {
  switch (city) {
    case 'ATL': {
      return 'https://images.unsplash.com/photo-1453301109223-3e2085a1e69d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3088&q=80';
    }
    case 'BKN':
      return 'https://images.unsplash.com/photo-1561917443-6c5a9a4fca6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3086&q=80;';
    case 'BOS':
      return 'https://images.unsplash.com/photo-1649785118522-34139e0d0385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3063&q=80';
    default:
      return 'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2500&q=80';
  }
}

export function getPlaceholderImageURL(imageURL: string): string {
  return `/_next/image?url=${encodeURIComponent(imageURL)}&q=1&w=128`;
}

export const getRandomImage = (city: string) =>
  `https://source.unsplash.com/random?basketball,${city}`;

export type TPlayer = {
  first_name: string;
  height_feet: number;
  height_inches: number;
  id: number;
  last_name: string;
  position: string;
  team_id: number;
  weight_pounds: number;
};

export type TStat = {
  id: number;
  ast: number;
  blk: number;
  dreb: number;
  fg3_pct: number;
  fg3a: number;
  fg3m: number;
  fg_pct: number;
  fga: number;
  fgm: number;
  ft_pct: number;
  fta: number;
  ftm: number;
  game: {
    id: number;
    date: string;
    home_team_id: number;
    home_team_score: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team_id: number;
    visitor_team_score: number;
  };
  min: number;
  oreb: number;
  pf: number;
  player: {
    id: number;
    first_name: string;
    height_feet: number;
    height_inches: number;
    last_name: string;
    position: string;
    team_id: number;
    weight_pounds: number;
  };
  pts: number;
  reb: number;
  stl: number;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  turnover: number;
};

export type TTeam = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
  image: string;
  placeholderImage: string;
  icon: TAvailableIcons;
};

export type TTeamAbbr =
  | 'ATL'
  | 'BOS'
  | 'BKN'
  | 'CHA'
  | 'CHI'
  | 'CLE'
  | 'DAL'
  | 'DEN'
  | 'DET'
  | 'GSW'
  | 'HOU'
  | 'IND'
  | 'LAC'
  | 'LAL'
  | 'MEM'
  | 'MIA'
  | 'MIL'
  | 'MIN'
  | 'NOP'
  | 'NYK'
  | 'OKC'
  | 'ORL'
  | 'PHI'
  | 'PHX'
  | 'POR'
  | 'SAC'
  | 'SAS'
  | 'TOR'
  | 'UTA'
  | 'WAS';

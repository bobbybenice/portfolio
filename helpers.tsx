import { useEffect, useRef, useState } from 'react';

import { TAvailableIcons } from './components/Icon/IconComponent';
import { TTeamAbbr } from './pages/nba/types';
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

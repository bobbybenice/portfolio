import { useEffect, useRef, useState } from 'react';
import { TeamLogoIcons } from './assets';
import { TAvailableIcons } from './components/Icon/IconComponent';
import { TTeamAbbr } from './pages/nba/types';

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
  ATL: TeamLogoIcons.Hawks,
  BOS: TeamLogoIcons.Celtics,
  BKN: TeamLogoIcons.Nets,
  CHA: TeamLogoIcons.Hornets,
  CHI: TeamLogoIcons.Bulls,
  CLE: TeamLogoIcons.Cavaliers,
  DAL: TeamLogoIcons.Mavericks,
  DEN: TeamLogoIcons.Nuggets,
  DET: TeamLogoIcons.Pistons,
  GSW: TeamLogoIcons.Celtics,
  HOU: TeamLogoIcons.Celtics,
  IND: TeamLogoIcons.Celtics,
  LAC: TeamLogoIcons.Celtics,
  LAL: TeamLogoIcons.Celtics,
  MEM: TeamLogoIcons.Celtics,
  MIA: TeamLogoIcons.Celtics,
  MIL: TeamLogoIcons.Celtics,
  MIN: TeamLogoIcons.Celtics,
  NOP: TeamLogoIcons.Celtics,
  NYK: TeamLogoIcons.Celtics,
  OKC: TeamLogoIcons.Celtics,
  ORL: TeamLogoIcons.Celtics,
  PHI: TeamLogoIcons.Celtics,
  PHX: TeamLogoIcons.Celtics,
  POR: TeamLogoIcons.Celtics,
  SAC: TeamLogoIcons.Celtics,
  SAS: TeamLogoIcons.Celtics,
  TOR: TeamLogoIcons.Celtics,
  UTA: TeamLogoIcons.Celtics,
  WAS: TeamLogoIcons.Celtics,
};

export const TeamLogoStrings: TAvailableIcons[] = [
  'Bulls',
  'Cavaliers',
  'Celtics',
  'Hawks',
  'Hornets',
  'Mavericks',
  'Nets',
  'Nuggets',
  'Pistons',
];

export function getTeamLogo(team: TTeamAbbr) {
  return TeamLogos[team];
}

export function getTeamLogoString(team: string): TAvailableIcons {
  const logo = TeamLogoStrings.find((x) => x === team);
  if (!logo) {
    return 'Celtics';
  }
  return logo;
}

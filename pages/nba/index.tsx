// https://www.balldontlie.io/#get-all-teams

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import QUERY_COUNTRIES from '../queryCountries.graphql';

export default function Nba() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  if (error) {
    return <p>:: an error happened</p>;
  }

  if (!data) {
    return <p>:: no data</p>;
  }

  return (
    <>
      <Link href={'nba/players'}>Players</Link>
      <Link href={'nba/teams'}>Teams</Link>
    </>
  );
}

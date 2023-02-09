import { useQuery } from '@apollo/client';
import Link from 'next/link';

import QUERY_COUNTRIES from '../queryCountries.graphql';

export default function Nba() {
  const { data, error } = useQuery(QUERY_COUNTRIES);

  if (error) {
    return <p>:: an error happened</p>;
  }

  if (!data) {
    return <p>:: no data</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen gap-4">
      <Link
        href={'nba/players'}
        className="bg-purple-500 py-4 px-8 rounded-lg text-white hover:bg-purple-700 transition-colors"
      >
        Players
      </Link>
      <Link
        href={'nba/teams'}
        className="bg-purple-500 py-4 px-8 rounded-lg text-white hover:bg-purple-700 transition-colors"
      >
        Teams
      </Link>
    </div>
  );
}

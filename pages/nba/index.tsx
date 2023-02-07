import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { Button, Card } from '../../components';
import QUERY_COUNTRIES from '../queryCountries.graphql';

export default function Nba() {
  const { data, error } = useQuery(QUERY_COUNTRIES);
  const [buttonLoading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(!buttonLoading);
  }, [buttonLoading]);

  if (error) {
    return <p>:: an error happened</p>;
  }

  if (!data) {
    return <p>:: no data</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '1rem',
      }}
    >
      <Card boxShadow>
        <Link href={'nba/players'}>Players</Link>
      </Card>
      <Card>
        <Link href={'nba/teams'}>Teams</Link>
      </Card>
      <Button label="Click me" onClick={handleClick} loading={buttonLoading} />
    </div>
  );
}

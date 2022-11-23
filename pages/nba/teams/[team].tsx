import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TTeam } from '../types';

export default function Team() {
  const [team, setTeam] = useState<TTeam>();

  const router = useRouter();
  const id = router.query.team;

  const fetchTeamsById = async () => {
    await axios
      .get(`https://www.balldontlie.io/api/v1/teams/${id}`)
      .then((res) => {
        if (res.data) {
          setTeam(res.data);
        }
      });
  };

  useEffect(() => {
    if (id) {
      fetchTeamsById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!team) {
    return <h1>:: no team</h1>;
  }

  return (
    <div>
      {team.id} {team.full_name}
    </div>
  );
}

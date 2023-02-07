import { useEffect, useState } from 'react';
import axios from 'axios';
import { TTeam } from 'helpers';
import { useRouter } from 'next/router';

import { Loader } from '../../../components';

export default function Team() {
  const [team, setTeam] = useState<TTeam>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const id = router.query.team;

  const fetchTeamsById = async () => {
    await axios
      .get(`https://www.balldontlie.io/api/v1/teams/${id}`)
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res.data) {
          setTeam(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchTeamsById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!team) {
    return <h1>:: no team</h1>;
  }

  return (
    <div>
      {team.id} {team.full_name} {team.abbreviation}
    </div>
  );
}

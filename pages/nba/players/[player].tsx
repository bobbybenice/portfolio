import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, useDragControls } from 'framer-motion';
import { TStat } from 'helpers';
import { useRouter } from 'next/router';

export default function Player() {
  const [playerStat, setPlayerStat] = useState<TStat[]>([]);

  const constraintsRef = useRef<HTMLDivElement>(null);
  const leftConstraintsRef = useRef<HTMLDivElement>(null);
  const rightConstraintsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const id = router.query.player;

  const controls = useDragControls();

  const startDrag = useCallback(
    (event: PointerEvent) => {
      controls.start(event);
    },
    [controls]
  );

  const fetchStatsByPlayer = async () => {
    await axios
      .get(
        `https://www.balldontlie.io/api/v1/stats?seasons[]=1990&player_ids[]=${id}`
      )
      .then((res) => {
        if (res.data.data) {
          setPlayerStat(res.data.data);
        }
      });
  };
  useEffect(() => {
    if (id) {
      fetchStatsByPlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (playerStat.length === 0) {
    return <h1>No stats for this player</h1>;
  }

  return 1 > 0 ? (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'black',
        overflow: 'hidden',
      }}
    >
      <div
        ref={leftConstraintsRef}
        style={{
          flex: '1 0 50%',
          background: 'lightcoral',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
        }}
      >
        <motion.div
          drag
          // dragControls={controls}
          dragConstraints={leftConstraintsRef}
          onDrag={startDrag as any}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '24px',
            backgroundColor: 'black',
          }}
        />
      </div>
      <motion.div
        ref={rightConstraintsRef}
        style={{ flex: '1 0 50%', background: 'lightgreen' }}
        initial={{ translateY: '0%' }}
      >
        <motion.div
          drag
          dragControls={controls}
          dragConstraints={rightConstraintsRef}
          // disables this draggable element as the initiator
          // dragListener={false}
          style={{ width: '100%', height: '200px', background: 'red' }}
        ></motion.div>
      </motion.div>
    </div>
  ) : (
    <div
      style={{
        padding: '1rem',
        minHeight: '100vh',
        // to support touch screens
        touchAction: 'none',
      }}
      ref={constraintsRef}
    >
      <div onPointerDown={startDrag as any}>
        {playerStat?.find((x) => x.player.first_name)?.player.first_name}{' '}
        {playerStat?.find((x) => x.player.first_name)?.player.last_name}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1rem',
          width: '50%',
        }}
      >
        {playerStat?.map((stat) => (
          <motion.div
            key={stat.id}
            drag
            dragControls={controls}
            dragConstraints={constraintsRef}
            dragSnapToOrigin
            style={{
              marginBottom: 16,
              display: 'flex',
              flexDirection: 'column',
              flex: '0 1 calc(100% / 6 - 1rem)',
              height: '4rem',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'lightgreen',
              borderRadius: '4rem',
              gap: '0.5rem',
            }}
          >
            <div>
              {new Date(stat.game.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </div>
            {/* <div>Points: {stat.pts}</div> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

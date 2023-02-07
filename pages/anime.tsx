import { useEffect, useState } from 'react';
import anime from 'animejs';

import { Cup, Peace } from '../assets';

type TActiveStyles = 'basic' | 'stagger' | 'timeline';

export default function Anime() {
  const [activeStyle, setActiveStyle] = useState<TActiveStyles>('stagger');

  const setBasicAnim = () => {
    anime({
      targets: '.basic-bounce',
      translateY: [{ value: 0 }, { value: -240 }],
      // |
      scaleY: [{ value: [1], easing: 'easeOutInElastic' }, { value: [1, 2] }],
      // –
      scaleX: [{ value: [2, 1] }, { value: [1] }],
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutCirc',
    });
  };

  const setStaggerAnim = () => {
    anime({
      targets: '.peace_svg__cls-2',
      opacity: [
        { value: 1, duration: 500, easing: 'easeOutSine' },
        { value: 0, duration: 2000, easing: 'easeOutSine' },
        { value: 1, duration: 500, easing: 'easeOutSine' },
      ],
      fill: [
        { value: '#8B8BF7', duration: 2500, easing: 'easeOutSine' },
        { value: '#000', duration: 500, easing: 'easeOutSine' },
        { value: '#8B8BF7', duration: 500, easing: 'linear' },
      ],
      translateY: [
        { value: 0, duration: 500, easing: 'easeOutSine' },
        { value: -2, duration: 1000, easing: 'easeOutSine' },
        { value: 2, duration: 1000, easing: 'easeOutSine' },
        { value: 0, duration: 500, easing: 'easeOutSine' },
      ],
      delay: anime.stagger(200, { grid: [50, 10], from: 10 }),
      loop: true,
    });
    anime({
      targets: '.peace_svg__cls-1',
      scale: [
        { value: 1.001, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 2500 },
      ],
      translateX: [
        { value: 0, duration: 500, easing: 'easeOutSine' },
        { value: -100, duration: 1000, easing: 'easeOutSine' },
        { value: 100, duration: 1000, easing: 'easeOutSine' },
        { value: 0, duration: 500, easing: 'easeOutSine' },
      ],
      opacity: [
        { value: 1, duration: 1000, easing: 'easeOutSine' },
        { value: 0.1, duration: 1000, easing: 'easeOutSine' },
        { value: 1, duration: 1000, easing: 'easeOutSine' },
      ],
      delay: anime.stagger(200, { grid: [20, 8], from: 'center' }),
      loop: true,
    });
  };

  const setTimelineAnim = () => {
    var paths = [
      {
        id: '#cup_svg__path5419',
        d: 'm 574.27172,479 0,-15.65736 -32.82996,4.54569 z',
      },
      {
        id: '#cup_svg__path4232',
        d: 'm 574.27172,479 -23.23351,25.75889 -9.59645,-36.87056 z',
      },
      {
        id: '#cup_svg__path4236',
        d: 'm 506.33896,522.43656 44.69925,-17.67767 -9.59645,-36.87056 z',
      },
      {
        id: '#cup_svg__path4240',
        d: 'm 506.33896,522.43656 18.18275,-51.26524 16.92005,-3.28299 z',
      },
      {
        id: '#cup_svg__path4244',
        d: 'm 545.22983,415.36039 -20.70812,55.81093 16.92005,-3.28299 z',
      },
      {
        id: '#cup_svg__path4248',
        d: 'm 545.22983,415.36039 -20.70812,55.81093 -29.04189,-24.74873 z',
      },
      {
        id: '#cup_svg__path4252',
        d: 'm 506.33896,522.43656 18.18275,-51.26524 -29.86566,-26.49728 z',
      },
      {
        id: '#cup_svg__path4628',
        d: 'm 545.22983,415.36039 -61.77955,-47.7605 12.02954,78.8227 z',
      },
      {
        id: '#cup_svg__path4632',
        d: 'm 506.33896,522.43656 -23.24582,-0.55095 11.56291,-77.21157 z',
      },
      {
        id: '#cup_svg__path4634',
        d: 'm 545.22983,415.36039 -61.77955,-47.7605 46.6724,-16.53444 z',
      },
      {
        id: '#cup_svg__path4636',
        d: 'm 463.08697,427.86039 20.36331,-60.2605 12.02954,78.8227 z',
      },
      {
        id: '#cup_svg__path4644',
        d: 'm 439.55325,458.86513 43.53989,63.02048 11.56291,-77.21157 z',
      },
      {
        id: '#cup_svg__path4646',
        d: 'm 439.55325,458.86513 22.11132,-30.90809 32.99148,16.717 z',
      },
      {
        id: '#cup_svg__path4648',
        d: 'm 439.55325,458.86513 43.53989,63.02048 -78.07995,-18.99728 z',
      },
      {
        id: '#cup_svg__path4656',
        d: 'm 395.26754,536.00799 87.8256,-14.12238 -78.07995,-18.99728 z',
      },
      {
        id: '#cup_svg__path4658',
        d: 'm 395.26754,536.00799 -47.1744,-29.83667 56.92005,-3.28299 z',
      },
      {
        id: '#cup_svg__path4660',
        d: 'm 395.26754,536.00799 -47.1744,-29.83667 -20.22281,21.71701 z',
      },
      {
        id: '#cup_svg__path4662',
        d: 'm 439.55325,458.86513 -30.74582,10.87762 -3.79424,33.14558 z',
      },
      {
        id: '#cup_svg__path4672',
        d: 'm 355.26754,495.2937 53.53989,-25.55095 -3.79424,33.14558 z',
      },
      {
        id: '#cup_svg__path4674',
        d: 'm 355.26754,495.2937 53.53989,-25.55095 -60.9371,8.14558 z',
      },
      {
        id: '#cup_svg__path4676',
        d: 'm 378.83897,465.2937 29.96846,4.44905 -60.9371,8.14558 z',
      },
      {
        id: '#cup_svg__path4678',
        d: 'm 378.83897,465.2937 29.96846,4.44905 -35.9371,-23.99728 z',
      },
      {
        id: '#cup_svg__path4688',
        d: 'm 438.83897,458.15084 -30.03154,11.59191 -35.9371,-23.99728 z',
      },
      {
        id: '#cup_svg__path4690',
        d: 'm 438.83897,458.15084 22.8256,-29.83666 -88.79424,17.43129 z',
      },
      {
        id: '#cup_svg__path4692',
        d: 'm 416.69611,410.2937 44.96846,18.02048 -88.79424,17.43129 z',
      },
      {
        id: '#cup_svg__path4694',
        d: 'm 416.69611,410.2937 44.96846,18.02048 21.20576,-60.42585 z',
      },
      {
        id: '#cup_svg__path4704',
        d: 'm 499.51554,316.07468 -16.06526,51.52521 46.6724,-16.53444 z',
      },
      {
        id: '#cup_svg__path4706',
        d: 'm 499.51554,316.07468 -16.06526,51.52521 -46.89903,-36.53444 z',
      },
      {
        id: '#cup_svg__path4708',
        d: 'm 417.37268,408.93182 66.0776,-41.33193 -46.89903,-36.53444 z',
      },
      {
        id: '#cup_svg__path4729',
        d: 'm 499.51554,316.07468 -33.20812,-40.61765 -29.75617,55.60842 z',
      },
      {
        id: '#cup_svg__path4731',
        d: 'm 400.94411,254.64611 65.36331,20.81092 -29.75617,55.60842 z',
      },
      {
        id: '#cup_svg__path4733',
        d: 'm 400.94411,254.64611 -42.49383,99.38235 78.10097,-22.96301 z',
      },
      {
        id: '#cup_svg__path4735',
        d: 'm 417.37268,413.21754 -58.9224,-59.18908 78.10097,-22.96301 z',
      },
      {
        id: '#cup_svg__path4743',
        d: 'm 417.37268,413.21754 -58.9224,-59.18908 12.38668,89.17985 z',
      },
      {
        id: '#cup_svg__path4747',
        d: 'm 308.08697,438.21754 50.36331,-84.18908 12.38668,89.17985 z',
      },
      {
        id: '#cup_svg__path4749',
        d: 'm 308.08697,438.21754 50.36331,-84.18908 -48.32761,-19.39158 z',
      },
      {
        id: '#cup_svg__path4755',
        d: 'm 400.94411,254.64611 -42.49383,99.38235 2.38668,-65.10587 z',
      },
      {
        id: '#cup_svg__path4757',
        d: 'm 309.51554,333.93182 48.93474,20.09664 2.38668,-65.10587 z',
      },
      {
        id: '#cup_svg__path4776',
        d: 'm 308.08697,438.21754 -26.06526,-84.18908 28.10096,-19.39158 z',
      },
      {
        id: '#cup_svg__path4778',
        d: 'm 309.51554,333.93182 -11.06526,-83.47479 62.38668,38.46556 z',
      },
      {
        id: '#cup_svg__path4780',
        d: 'm 235.22983,324.64611 46.79188,29.38235 28.10096,-19.39158 z',
      },
      {
        id: '#cup_svg__path4799',
        d: 'm 235.22983,324.64611 46.79188,29.38235 -64.75618,47.75128 z',
      },
      {
        id: '#cup_svg__path4801',
        d: 'm 240.94412,431.07468 41.07759,-77.04622 -64.75618,47.75128 z',
      },
      {
        id: '#cup_svg__path4818',
        d: 'm 240.94412,431.07468 41.07759,-77.04622 25.24382,84.89414 z',
      },
      {
        id: '#cup_svg__path4820',
        d: 'm 240.94412,431.07468 24.64902,30.81092 41.67239,-22.963 z',
      },
      {
        id: '#cup_svg__path4822',
        d: 'm 256.65841,508.93182 8.93473,-47.04622 41.67239,-22.963 z',
      },
      {
        id: '#cup_svg__path4824',
        d: 'm 240.94412,431.07468 24.64902,30.81092 -41.18475,24.17986 z',
      },
      {
        id: '#cup_svg__path4858',
        d: 'm 242.37269,498.21754 23.22045,-36.33194 -41.18475,24.17986 z',
      },
      {
        id: '#cup_svg__path4860',
        d: 'm 241.65841,498.21754 23.93473,-36.33194 -9.75618,47.037 z',
      },
      {
        id: '#cup_svg__path4862',
        d: 'm 235.58698,508.57468 -10.70813,34.73949 30.95811,-34.39157 z',
      },
      {
        id: '#cup_svg__path4864',
        d: 'm 249.51555,534.64611 -24.6367,8.66806 30.95811,-34.39157 z',
      },
      {
        id: '#cup_svg__path4866',
        d: 'm 234.8727,508.21754 -9.99385,35.09663 -21.18475,-9.39157 z',
      },
      {
        id: '#cup_svg__path4878',
        d: 'm 235.58698,508.57468 6.43473,-9.54622 13.81525,9.89414 z',
      },
      {
        id: '#cup_svg__path4880',
        d: 'm 235.58698,508.57468 6.43473,-9.54622 -16.18475,-12.963 z',
      },
      {
        id: '#cup_svg__path4961',
        d: 'm 235.58698,508.57468 -37.1367,-12.40336 27.38668,-10.10586 z',
      },
      {
        id: '#cup_svg__path5128',
        d: 'm 235.58698,508.57468 -35.70813,4.02521 -1.18475,-15.82014 z',
      },
      {
        id: '#cup_svg__path5130',
        d: 'm 188.44412,507.50325 11.43473,5.09664 -1.18475,-15.82014 z',
      },
      {
        id: '#cup_svg__path5136',
        d: 'm 400.94411,254.64611 -48.9224,0.81092 8.81525,33.46556 z',
      },
      {
        id: '#cup_svg__path5138',
        d: 'm 296.6584,251.07468 55.36331,4.38235 8.81525,33.46556 z',
      },
      {
        id: '#cup_svg__path5140',
        d: 'm 309.51554,333.93182 -11.06526,-83.47479 -65.47046,74.17985 z',
      },
      {
        id: '#cup_svg__path5142',
        d: 'm 245.94411,238.93182 52.50617,11.52521 -65.47046,74.17985 z',
      },
      {
        id: '#cup_svg__path5144',
        d: 'm 235.22983,324.64611 -40.35098,0.81092 22.38668,76.32271 z',
      },
      {
        id: '#cup_svg__path5166',
        d: 'm 235.22983,324.64611 -40.35098,0.81092 21.67239,-58.67729 z',
      },
      {
        id: '#cup_svg__path5168',
        d: 'm 245.94411,238.93182 -31.06526,30.09664 18.10097,55.60842 z',
      },
      {
        id: '#cup_svg__path5170',
        d: 'm 245.94411,238.93182 -31.06526,30.09664 -15.47046,-40.10587 z',
      },
      {
        id: '#cup_svg__path5172',
        d: 'm 195.22982,329.64611 19.64903,-60.61765 -15.47046,-40.10587 z',
      },
      {
        id: '#cup_svg__path5174',
        d: 'm 195.22982,329.64611 -9.63668,-57.76051 13.81525,-42.96301 z',
      },
      {
        id: '#cup_svg__path5176',
        d: 'm 169.51553,212.50325 16.07761,59.38235 13.81525,-42.96301 z',
      },
      {
        id: '#cup_svg__path5186',
        d: 'm 169.51553,212.50325 16.07761,59.38235 -50.47046,-45.82015 z',
      },
      {
        id: '#cup_svg__path5188',
        d: 'm 169.51553,212.50325 -33.2081,-19.90336 -1.18475,33.46556 z',
      },
      {
        id: '#cup_svg__path5190',
        d: 'm 169.51553,212.50325 -33.2081,-19.90336 30.24382,-10.82015 z',
      },
      {
        id: '#cup_svg__path5200',
        d: 'm 169.51553,212.50325 28.93476,13.66807 -31.89904,-44.39158 z',
      },
      {
        id: '#cup_svg__path5202',
        d: 'm 213.08696,196.78896 -14.63667,29.38236 -31.89904,-44.39158 z',
      },
      {
        id: '#cup_svg__path5204',
        d: 'm 213.08696,196.78896 -7.49381,-37.7605 -39.0419,22.75128 z',
      },
      {
        id: '#cup_svg__path5206',
        d: 'm 213.08696,196.78896 -7.49381,-37.7605 31.67239,45.60842 z',
      },
      {
        id: '#cup_svg__path5208',
        d: 'm 213.08696,196.78896 -14.63667,29.38236 38.81525,-19.39158 z',
      },
      {
        id: '#cup_svg__path5258',
        d: 'm 213.08696,196.78896 -7.49381,-37.7605 31.67239,45.60842 z',
      },
      {
        id: '#cup_svg__path5260',
        d: 'm 255.9441,158.93182 -50.35095,0.0966 31.67239,45.60842 z',
      },
      {
        id: '#cup_svg__path5262',
        d: 'm 245.22982,238.21753 -46.77953,-12.04621 38.81525,-19.39158 z',
      },
      {
        id: '#cup_svg__path5270',
        d: 'm 245.22982,238.21753 47.50618,-40.2605 -55.47046,8.82271 z',
      },
      {
        id: '#cup_svg__path5272',
        d: 'm 245.22982,238.21753 47.50618,-40.2605 4.1724,52.75128 z',
      },
      {
        id: '#cup_svg__path5286',
        d: 'm 255.94411,160.00324 36.79189,37.95379 -55.47046,8.82271 z',
      },
      {
        id: '#cup_svg__path5288',
        d: 'm 270.94411,147.86038 21.79189,50.09665 28.81525,-22.24872 z',
      },
      {
        id: '#cup_svg__path5296',
        d: 'm 310.58697,148.21752 36.79189,-0.61763 -25.82761,28.10842 z',
      },
      {
        id: '#cup_svg__path5298',
        d: 'm 310.58697,148.21752 -40.70811,0.4538 51.67239,27.03699 z',
      },
      {
        id: '#cup_svg__path5306',
        d: 'm 310.58697,148.21752 36.79189,-0.61763 -24.75618,-22.96301 z',
      },
      {
        id: '#cup_svg__path5310',
        d: 'm 349.1584,132.86038 -1.77954,14.73951 -24.75618,-22.96301 z',
      },
      {
        id: '#cup_svg__path5316',
        d: 'm 349.1584,132.86038 -4.63668,-14.18906 -21.89904,5.96556 z',
      },
      {
        id: '#cup_svg__path5324',
        d: 'm 270.94411,147.86038 21.79189,50.09665 28.81525,-22.24872 z',
      },
      {
        id: '#cup_svg__path5341',
        d: 'm 255.58697,160.00323 14.29189,-11.33191 23.10096,49.89413 z',
      },
      {
        id: '#cup_svg__path5343',
        d: 'm 310.58697,148.21752 -40.70811,0.4538 52.38668,-23.6773 z',
      },
      {
        id: '#cup_svg__path5345',
        d: 'm 293.08697,96.431806 -23.20811,52.239514 52.38668,-23.6773 z',
      },
      {
        id: '#cup_svg__path5357',
        d: 'm 293.08697,96.431806 41.0776,9.739514 -11.89903,18.8227 z',
      },
      {
        id: '#cup_svg__path5359',
        d: 'm 293.08697,96.431806 41.0776,9.739514 -12.97046,-43.6773 z',
      },
      {
        id: '#cup_svg__path5361',
        d: 'm 345.58697,65.003235 -11.4224,41.168085 -12.97046,-43.6773 z',
      },
    ];

    var timeline = anime.timeline({
      autoplay: true,
      direction: 'alternate',
      loop: true,
    });

    paths.forEach(function (path, index) {
      timeline.add({
        targets: path.id,
        d: {
          value: path.d,
          duration: 1000,
          easing: 'easeInOutQuad',
        },
        offset: 1000 + 10 * index,
      });
    });

    timeline.add({
      targets: 'path:first-child',
      opacity: {
        value: 1,
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      offset: 2000 + 10 * paths.length,
    });
  };

  useEffect(() => {
    if (activeStyle === 'basic') {
      setBasicAnim();
    }
    if (activeStyle === 'stagger') {
      setStaggerAnim();
    }
    if (activeStyle === 'timeline') {
      setTimelineAnim();
    }
  }, [activeStyle]);

  const renderActiveStyle = () => {
    switch (activeStyle) {
      case 'stagger':
        return <Peace />;
      case 'timeline':
        return <Cup />;
      default:
        return (
          <div
            className="basic-bounce"
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#000',
            }}
          />
        );
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '5% 0',
      }}
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: '16px' }}>
        <button onClick={() => setActiveStyle('basic')}>Basic</button>
        <button onClick={() => setActiveStyle('stagger')}>Stagger</button>
        <button onClick={() => setActiveStyle('timeline')}>Timeline</button>
      </div>
      {renderActiveStyle()}
    </div>
  );
}

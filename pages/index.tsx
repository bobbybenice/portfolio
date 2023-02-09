import { Layout } from 'components';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function Home() {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, rgb(211, 9, 225) 100%)',
    'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
    'linear-gradient(180deg, rgba(189, 205, 214, 0.75) 0%, #7700ff 100%)',
  ]);
  const color = useTransform(x, xInput, [
    'rgb(211, 9, 225)',
    'rgb(68, 0, 255)',
    '#7700ff',
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <motion.div
      className="w-screen h-screen absolute top-0 left-0 z-0"
      style={{ background }}
    >
      <Layout>
        <motion.div
          className="bg-white rounded-3xl w-36 h-36 absolute top-[calc(80%-144px/2)] left-[calc(50%-144px/2)] flex justify-center items-center z-0"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
        >
          <svg className="w-4/5 h-4/5" viewBox="0 0 50 50">
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{ translateX: 5, translateY: 5 }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M14,26 L 22,33 L 35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickPath }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathA }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathB }}
            />
          </svg>
        </motion.div>
      </Layout>
    </motion.div>
  );
}

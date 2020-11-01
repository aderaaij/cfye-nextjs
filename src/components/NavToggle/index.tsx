import { motion } from 'framer-motion';
import cn from 'classnames';

import useHover from '@/hooks/useHover';

interface Props {
  toggle: any;
}
const NavToggle: React.FC<Props> = ({ toggle }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div className="fixed top-0 left-0 mt-2 ml-2 z-50 p-1 w-12 h-12 bg-transparent">
      <button
        className="relative outline-none m-0 p-0 border-none focus:outline-none shadow-md hover:shadow-lg"
        onClick={toggle}
        ref={hoverRef}
      >
        <motion.svg
          className="w-full h-full"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 508 508"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        >
          <path
            fill="#ec008c"
            className="text-white"
            d="M-.3.2h508.5v507.5H-.3z"
          />
          <path
            fill="currentColor"
            className="text-white"
            d="M203.2 391.9L97.6 302.1v-31.8H63.5v46.8L176 410.8H63.6v33.8h173.5V270.2h-33.9zM444.9 270.2l-173.4.1v174.4h173.4v-33.9H332.5L445 317.1l-.1-46.9zM305.3 391.9v-88.4h104l-104 88.4zM303.5 161.6V97.5h106.9v21.7h34.2V63.7l-175-.1v173.7h33.9v-42.7h140.6v-33zM236.5 203.2H96.7V96.5h105.9v21.2h34.3V62.8l-174 .1v174.2h173.6z"
          />
        </motion.svg>
        <motion.ul
          className="absolute top-0 left-0 w-full h-full list-none flex flex-col justify-between py-2 px-1"
          variants={{
            closed: { opacity: 0 },
            open: { opacity: 1 },
          }}
        >
          <li className="w-full h-1 bg-white"></li>
          <li className="w-full h-1 bg-white"></li>
          <li className="w-full h-1 bg-white"></li>
        </motion.ul>
      </button>
    </div>
  );
};
export default NavToggle;

import React from 'react';
import { motion, Variants } from 'framer-motion';

const logoVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  open: {
    scale: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
    },
  },
  active: {
    scale: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
    },
  },
  closed: {
    scale: 1,
  },
};

interface Props {
  buttonState: string;
}

const SiteLogo: React.FC<Props> = ({ buttonState }) => {
  return (
    <motion.svg
      className="nav-toggle__logo"
      variants={logoVariants}
      animate={buttonState}
      xmlns="http://www.w3.org/2000/svg"
      id="logo"
      version="1.1"
      viewBox="0 0 508 508"
      xmlSpace="preserve"
    >
      <rect width="508.5" height="507.5" x="-.3" y=".2" fill="#ec008c" />
      <motion.polygon
        variants={itemVariants}
        points="236.5,203.2 96.7,203.2 96.7,96.5 202.6,96.5 202.6,117.7 236.9,117.7 236.9,62.8 62.9,62.9 62.9,237.1 236.5,237.1"
        className="letter letter--c"
        fill="currentColor"
      />
      <motion.polygon
        variants={itemVariants}
        points="303.5,161.6 303.5,97.5 410.4,97.5 410.4,119.2 444.6,119.2 444.6,63.7 269.6,63.6 269.6,237.3 303.5,237.3 303.5,194.6 444.1,194.6 444.1,161.6"
        className="letter letter--f"
        fill="currentColor"
      />
      <motion.polygon
        variants={itemVariants}
        points="203.2,391.9 97.6,302.1 97.6,270.3 63.5,270.3 63.5,317.1 176,410.8 63.6,410.8 63.6,444.6 237.1,444.6 237.1,270.2 203.2,270.2"
        className="letter letter--y"
        fill="currentColor"
      />
      <motion.path
        variants={itemVariants}
        d="M444.9 270.2l-173.4.1v174.4h173.4v-33.9H332.5L445 317.1l-.1-46.9zM305.3 391.9v-88.4h104l-104 88.4z"
        className="letter letter--e"
        fill="currentColor"
      />
    </motion.svg>
  );
};
export default SiteLogo;

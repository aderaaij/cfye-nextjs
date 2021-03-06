import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import SiteLogo from '@/components/SiteLogo';
import useHover from '@/hooks/useHover';
import { useRouter } from 'next/router';

interface Props {
  toggle: any;
}
const listVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.05,
      when: 'afterChildren',
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
      when: 'beforeChildren',
      staggerDirection: -1,
    },
  },
  active: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
      staggerDirection: 1,
    },
  },
};

const barVariants = (i: number) => ({
  open: {
    scale: 1,
    rotate: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 400,
    },
  },
  closed: {
    scale: 0,
    rotate: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
    },
  },
  active: {
    opacity: 1,
  },
});

interface Props {
  toggle: any;
  isActive: boolean;
}

const NavToggle: React.FC<Props> = ({ toggle, isActive }) => {
  const router = useRouter();
  const [hoverRef, isHovered] = useHover();
  const [buttonState, setButtonState] = useState('closed');
  const [isFocused, setFocus] = useState(false);

  useEffect(() => {
    if ((isHovered || isFocused) && !isActive) {
      setButtonState('open');
    } else if (isActive) {
      setButtonState('active');
    } else {
      setButtonState('closed');
    }
  }, [isHovered, isActive, isFocused]);

  return (
    <button
      className="nav-toggle"
      ref={hoverRef}
      onClick={() => {
        router.push('/');
        // toggle();
      }}
    >
      {/* <motion.ul
        className="nav-toggle__bars"
        initial="closed"
        animate={buttonState}
        variants={listVariants}
      >
        <motion.li
          variants={{
            ...barVariants(1),
            active: { rotate: 45, y: '10px', scale: 1 },
          }}
        ></motion.li>
        <motion.li
          variants={{
            ...barVariants(2),
            active: { scale: 0, opacity: 0 },
          }}
        ></motion.li>
        <motion.li
          variants={{
            ...barVariants(3),
            active: { rotate: -45, y: '-10px', scale: 1 },
          }}
        ></motion.li>
      </motion.ul> */}
      <SiteLogo buttonState="closed" />
    </button>
  );
};

export default NavToggle;

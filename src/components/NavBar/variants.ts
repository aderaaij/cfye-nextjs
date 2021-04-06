import { Spring, Variants } from 'framer-motion';
export const navBarVariants: Variants = {
  open: {
    x: '0%',
    opacity: 1,
  },
  closed: {
    x: 'calc(-100% - 72px)',
    opacity: 0,
  },
};

export const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

export const listItemvariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    opacity: 0,
    scale: 0,
  },
};

export const barSpring: Spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

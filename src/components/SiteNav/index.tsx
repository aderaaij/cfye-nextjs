import { motion, useCycle } from 'framer-motion';
import cn from 'classnames';
import NavToggle from '@/components/NavToggle';
import { useRef, useState } from 'react';
import styles from './site-nav.module.css';

const sidebar = {
  open: {
    opacity: 1,
    scale: 1,
    borderWidth: '64px',
    backgroundColor: 'rgba(255,255,255, 0.96)',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      restDelta: 2,
    },
  },
  closed: {
    opacity: 1,
    scale: 1.01,
    borderWidth: '0px',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255,255,255 0.0)',
    transition: {
      // delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const SiteNav: React.FC = () => {
  const [isNavOpen, toggleNavOpen] = useCycle(false, true);
  const [isNavAnimationDone, toggleNavAnimationDone] = useState(false);
  const containerRef = useRef(null);

  return (
    <>
      <motion.nav
        className={cn(`${styles.nav}`, 'fixed top-0 left-0 z-50 ', {
          'w-16 h-16': !isNavOpen && isNavAnimationDone,
        })}
        initial={false}
        animate={isNavOpen ? 'open' : 'closed'}
        onAnimationComplete={() => toggleNavAnimationDone(true)}
        ref={containerRef}
      >
        <NavToggle
          toggle={() => {
            return toggleNavOpen();
          }}
        />
        <motion.div
          className={cn(
            'w-screen h-screen grid fixed border-cfye border-l-16 border-r-16 border-t-16 border-b-16 top-0 left-0 z-40 bg-transparent',
            {
              'pointer-events-none': !isNavOpen,
            }
          )}
          variants={sidebar}
        />
      </motion.nav>
    </>
  );
};
export default SiteNav;

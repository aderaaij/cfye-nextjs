import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import styles from './SiteMenu.module.scss';
import { AppContext } from '../../../contexts/MenuContext';

import { useRouter } from 'next/router';
import sprite from '/public/sprite.svg';

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -250,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const childVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};
export const SiteMenu: React.FC = () => {
  const { isMenuActive, toggleMenu } = useContext(AppContext);
  const router = useRouter();
  const menuItems = {
    categories: {
      newWork: { name: 'New Work', href: '/category/new-work' },
      features: { name: 'Features', href: '/category/features' },
      interviews: { name: 'Interviews', href: '/category/interviews' },
      cfyeX: { name: 'CFYE X', href: '/category/cfye-x' },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={cx(styles['site-menu'], {
          [styles['site-menu--active']]: isMenuActive,
        })}
        animate={isMenuActive ? 'open' : 'closed'}
        variants={variants}
        // initial={{ opacity: 0, scale: 0.8 }}
        // animate={{ x: 0, opacity: 1, scale: 1 }}
        // exit={{ opacity: 0, scale: 0.8 }}
      >
        <div className={styles['top-wrap']}>
          <button
            className={styles['close-button']}
            onClick={() => toggleMenu(!isMenuActive)}
          >
            <svg>
              <use xlinkHref={sprite.src + '#close'}></use>
            </svg>
          </button>
        </div>
        <motion.ul variants={ulVariants} className={styles['menu-list']}>
          <motion.li
            variants={childVariants}
            onClick={() => toggleMenu(!isMenuActive)}
            className={cx(styles['menu-list__item'], {
              [styles['menu-list__item--active']]: '/' === router.asPath,
            })}
          >
            <Link href="/">
              <a>Home</a>
            </Link>
          </motion.li>
          {Object.keys(menuItems.categories).map((key) => {
            return (
              <motion.li
                variants={childVariants}
                key={key}
                onClick={() => toggleMenu(!isMenuActive)}
                className={cx(styles['menu-list__item'], {
                  [styles['menu-list__item--active']]:
                    menuItems.categories[key].href === router.asPath,
                })}
              >
                <Link href={menuItems.categories[key].href}>
                  <a>{menuItems.categories[key].name}</a>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
        <div className={styles['bottom-wrap']}></div>
      </motion.div>
    </AnimatePresence>
  );
};

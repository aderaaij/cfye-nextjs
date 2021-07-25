import { AnimatePresence, motion } from 'framer-motion';
import styles from './SiteMenu.module.scss';
import { AppContext } from '../../contexts/MenuContext';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sprite from '../../../public/sprite.svg';
import cx from 'classnames';

const SiteNav: React.FC = () => {
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
      {isMenuActive && (
        <motion.div
          className={styles['site-menu']}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
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
          <ul className={styles['menu-list']}>
            <li
              onClick={() => toggleMenu(!isMenuActive)}
              className={cx(styles['menu-list__item'], {
                [styles['menu-list__item--active']]: '/' === router.asPath,
              })}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {Object.keys(menuItems.categories).map((key) => {
              return (
                <li
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
                </li>
              );
            })}
          </ul>
          <div className={styles['bottom-wrap']}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteNav;

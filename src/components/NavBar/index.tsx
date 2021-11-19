import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MenuItem from '@/components/MenuItem';
import {
  navBarVariants,
  listVariants,
  listItemvariants,
  barSpring,
} from './variants';

interface Props {
  isActive: boolean;
}

const NavBar: React.FC<Props> = ({ isActive }) => {
  const menuItems = [
    { text: 'home', href: '/' },
    { text: 'about', href: '/about' },
  ];
  const [activeItem, setActive] = useState(menuItems[0].href);
  const { asPath } = useRouter();

  useEffect(() => {
    setActive(asPath);
  }, [asPath]);

  return (
    <motion.nav
      className="nav-bar"
      initial="closed"
      variants={navBarVariants}
      animate={isActive ? 'open' : 'closed'}
    >
      <motion.ul variants={listVariants} className="nav-bar__ul">
        {menuItems.map((item: any, i) => (
          <motion.li
            onMouseEnter={(): void => setActive(item.href)}
            key={i}
            variants={listItemvariants}
          >
            <MenuItem text={item.text} link={item.href} />
            {activeItem === item.href && (
              <motion.div
                layoutId="underline"
                initial={false}
                animate={{ scale: 1 }}
                transition={barSpring}
                className="underline"
              />
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};
export default NavBar;

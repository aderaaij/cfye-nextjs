import { useState, useEffect } from 'react';
import NavToggle from '@/components/NavToggle';
import NavBar from '@/components/NavBar';
import useHover from '@/hooks/useHover';

const SiteNav: React.FC = () => {
  const [isActive, toggleMenu] = useState(false);

  return (
    <nav className="nav-wrap" onMouseLeave={() => toggleMenu(false)}>
      <NavToggle isActive={isActive} toggle={() => toggleMenu(!isActive)} />
      <NavBar isActive={isActive} />
    </nav>
  );
};
export default SiteNav;

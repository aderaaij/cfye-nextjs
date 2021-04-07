import { useState } from 'react';
import NavToggle from '@/components/NavToggle';
import NavBar from '@/components/NavBar';

const SiteNav: React.FC = () => {
  const [isActive, toggleMenu] = useState(false);

  return (
    <nav className="nav-wrap">
      <NavToggle isActive={isActive} toggle={() => toggleMenu(!isActive)} />
      {/* <NavBar isActive={isActive} /> */}
    </nav>
  );
};
export default SiteNav;

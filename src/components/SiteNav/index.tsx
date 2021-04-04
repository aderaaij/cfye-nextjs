import MenuItem from '@/components/MenuItem';

const SiteNav: React.FC = () => {
  return (
    <nav>
      {/* <NavToggle /> */}

      <ul>
        <MenuItem text="home" link="/" />
        <MenuItem text="about" link="/about" />
      </ul>
    </nav>
  );
};
export default SiteNav;

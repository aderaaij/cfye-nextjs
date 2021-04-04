import MenuItem from '@/components/MenuItem';

const SiteNav: React.FC = () => {
  return (
    <nav>
      {/* <NavToggle /> */}

      <ul>
        <MenuItem text="home" link="/" />
      </ul>
    </nav>
  );
};
export default SiteNav;

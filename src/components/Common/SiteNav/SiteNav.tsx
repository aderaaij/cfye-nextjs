import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/MenuContext';

export const SiteNav: React.FC = () => {
  const { isMenuActive, toggleMenu } = useContext(AppContext);
  return (
    <nav className="site-nav">
      <div className="site-nav__container container">
        <div className="site-nav__inner">
          <button
            onClick={() => toggleMenu(!isMenuActive)}
            className="site-nav__menu-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 100 100"
              className="site-nav__menu-icon"
            >
              <rect fill="currentColor" width="56" height="8" x="22" y="26" />
              <rect fill="currentColor" width="40" height="8" x="22" y="46" />
              <rect fill="currentColor" width="24" height="8" x="22" y="66" />
            </svg>
          </button>
          <Link href="/">
            <a className="site-nav__logo-link">
              <img
                className="site-nav__logo"
                width={48}
                height={48}
                src="/images/cfye_logo.svg"
                alt="CFYE Logo"
              />
            </a>
          </Link>
          <Link href="/about/">
            <a className="site-nav__link">
              <span>About</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <title>About</title>
                <path
                  fill="currentColor"
                  d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

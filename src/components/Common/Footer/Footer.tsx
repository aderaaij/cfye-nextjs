import styles from './Footer.module.scss';
import cx from 'classnames';

export const Footer: React.FC<any> = ({}) => {
  return (
    <footer className={cx(styles['footer'], 'main')}>
      <div className="container">
        <div className="container__content-width">
          {/* <ul className={styles['link-list']}>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>Copyright</a>
          </li>
          <li>
            <a>Terms & Conditions</a>
          </li>
          <li>
            <a>Privacy Policy</a>
          </li>
          <li>
            <a>Twitter</a>
          </li>
        </ul> */}
          <span className={styles['tagline']}>
            <img
              alt="CFYE Logo"
              className={styles['logo']}
              src="/images/cfye_logo.svg"
            />{' '}
            Slangin&apos; Dope <br /> Since 2008
          </span>
        </div>
      </div>
    </footer>
  );
};

import styles from './Footer.module.scss';
import cx from 'classnames';

const Footer: React.FC<any> = ({}) => {
  return (
    <footer className={cx(styles['footer'], 'main')}>
      <div className="content-width content-width--container">
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
          <img className={styles['logo']} src="/images/cfye_logo.svg" />{' '}
          Slangin' Dope <br /> Since 2008
        </span>
      </div>
    </footer>
  );
};

export default Footer;

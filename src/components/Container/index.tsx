import styles from './Container.module.scss';

enum GridType {
  artistsGrid = 'artists-grid',
  containerGrid = 'container-grid',
  frontpageGrid = 'frontpage-grid',
}
interface Props {
  children: any;
  type?: 'artists-grid' | 'container-grid' | 'frontpage-grid' | 'article-grid';
}

const Container: React.FC<Props> = ({ children, type = 'default' }) => {
  if (type !== 'default') {
    return <div className={styles[type]}>{children}</div>;
  } else {
    return <>{children}</>;
  }
};

export default Container;

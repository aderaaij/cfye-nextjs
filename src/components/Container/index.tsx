import styles from './Container.module.scss';

enum GridType {
  artistsGrid = 'artists-grid',
  containerGrid = 'container-grid',
}
interface Props {
  children: any;
  type?: 'artists-grid' | 'container-grid';
}

const Container: React.FC<Props> = ({ children, type }) => {
  if (type === GridType.artistsGrid) {
    return <div className={styles[GridType.artistsGrid]}>{children}</div>;
  } else {
    return <>{children}</>;
  }
};

export default Container;

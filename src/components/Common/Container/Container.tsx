import styles from './Container.module.scss';

interface Props {
  children: React.ReactNode;
  type?: 'artists-grid' | 'container-grid' | 'frontpage-grid' | 'article-grid';
}

export const Container: React.FC<Props> = ({ children, type = 'default' }) => {
  if (type !== 'default') {
    return <div className={styles[type]}>{children}</div>;
  } else {
    return <>{children}</>;
  }
};

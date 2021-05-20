import { RootQueryToPostConnection } from 'types';
import ArticleExcerptSmall from '@/components/ArticleExcerptSmall';
import styles from './ExcerptsSmall.module.scss';
interface Props {
  title?: string;
  edges: RootQueryToPostConnection['edges'];
}

const ExcerptsSmall: React.FC<Props> = ({ title, edges }) => {
  return (
    <div className={styles['wrap']}>
      {title && <h2 className={styles['title']}>{title}</h2>}

      {edges.map(({ node }) => (
        <div className={styles['article']} key={node.id}>
          <ArticleExcerptSmall node={node} />
        </div>
      ))}
    </div>
  );
};

export default ExcerptsSmall;

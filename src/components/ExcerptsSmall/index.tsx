import { PostExcerptFieldsFragment } from 'types';
import styles from './ExcerptsSmall.module.scss';
import Excerpt from '../Excerpt';

interface Props {
  edges: Array<PostExcerptFieldsFragment>;
}

const ExcerptsSmall: React.FC<Props> = ({ edges }) => {
  return (
    <div className={styles['wrap']}>
      {edges.map(({ node }) => (
        <Excerpt key={node.id} node={node} />
      ))}
    </div>
  );
};

export default ExcerptsSmall;

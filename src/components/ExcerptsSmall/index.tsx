import cx from 'classnames';
import { PostExcerptFieldsFragment } from 'types';
import styles from './ExcerptsSmall.module.scss';
import Excerpt from '@/components/Excerpt';

interface Props {
  edges: Array<PostExcerptFieldsFragment>;
  rowSize?: number;
}

const ExcerptsSmall: React.FC<Props> = ({ edges, rowSize }) => {
  return (
    <div
      className={cx(styles['wrap'], {
        [styles[`wrap--${rowSize}`]]: rowSize,
      })}
    >
      {edges.map(({ node }) => (
        <Excerpt
          key={node.id}
          node={node}
          type={rowSize === 3 ? 'small' : null}
        />
      ))}
    </div>
  );
};

export default ExcerptsSmall;

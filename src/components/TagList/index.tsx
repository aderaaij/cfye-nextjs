import Link from 'next/link';
import { Post } from 'types';
import cx from 'classnames';
import styles from './TagList.module.scss';

interface Props {
  tags: Post['tags'];
  context?: 'heroExcerpt' | 'articleExcerpt' | 'default';
  isEven?: boolean;
}

const TagList: React.FC<Props> = ({
  tags,
  context = 'default',
  isEven = false,
}) => {
  if (!tags.edges.length) return null;
  return (
    <div
      className={cx(
        styles['tag-list-wrap'],
        styles[`tag-list-wrap--${context}`],
        { [styles['tag-list-wrap--is-even']]: isEven }
      )}
    >
      <span>Tags:</span>
      <ul className={styles['tag-list']}>
        {tags.edges.map(({ node }) => {
          return (
            <li key={node.name}>
              <Link as={`/tag/${node.slug}`} href="/tag/[slug]">
                <a>{node.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TagList;

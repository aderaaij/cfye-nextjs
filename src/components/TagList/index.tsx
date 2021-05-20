import Link from 'next/link';
import { Post } from 'types';
import cx from 'classnames';
import styles from './TagList.module.scss';

interface Props {
  tags: Post['tags'];
  context?: 'heroExcerpt' | 'articleExcerpt' | 'default';
}

const TagList: React.FC<Props> = ({ tags, context = 'default' }) => (
  <div
    className={cx(styles['tag-list-wrap'], styles[`tag-list-wrap--${context}`])}
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
export default TagList;

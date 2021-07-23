import Link from 'next/link';
import { Post } from 'types';
import cx from 'classnames';
import styles from './TagList.module.scss';

interface Props {
  tags: Post['tags'] | Post['categories'];
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
      <span>
        {tags.__typename === 'PostToTagConnection' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Tags:</title>
            <path
              stroke="currentColor"
              fill="currentColor"
              d="M467 45.2A44.45 44.45 0 00435.29 32H312.36a30.63 30.63 0 00-21.52 8.89L45.09 286.59a44.82 44.82 0 000 63.32l117 117a44.83 44.83 0 0063.34 0l245.65-245.6A30.6 30.6 0 00480 199.8v-123a44.24 44.24 0 00-13-31.6zM384 160a32 32 0 1132-32 32 32 0 01-32 32z"
            />
          </svg>
        )}
        {tags.__typename === 'PostToCategoryConnection' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Folder</title>
            <path
              stroke="currentColor"
              fill="currentColor"
              d="M496 152a56 56 0 00-56-56H220.11a23.89 23.89 0 01-13.31-4L179 73.41A55.77 55.77 0 00147.89 64H72a56 56 0 00-56 56v48a8 8 0 008 8h464a8 8 0 008-8zM16 392a56 56 0 0056 56h368a56 56 0 0056-56V216a8 8 0 00-8-8H24a8 8 0 00-8 8z"
            />
          </svg>
        )}
      </span>
      <ul className={styles['tag-list']}>
        {tags.edges.map(({ node }) => {
          return (
            <li key={node.name}>
              <Link
                as={`/${node.__typename.toLowerCase()}/${node.slug}`}
                href={`/${node.__typename.toLowerCase()}/[slug]`}
              >
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

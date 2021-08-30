import Link from 'next/link';
import cx from 'classnames';
import styles from './TagList.module.scss';
import sprite from '../../../public/sprite.svg';
interface Props {
  tags: any;
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
          <svg>
            <use xlinkHref={sprite.src + '#pricetag'}></use>
          </svg>
        )}
        {tags.__typename === 'PostToCategoryConnection' && (
          <svg>
            <use xlinkHref={sprite.src + '#folder'}></use>
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

import Link from 'next/link';
import cx from 'classnames';
import { OffsetPaginationPageInfo } from 'types';
import styles from './Pagination.module.scss';

interface Props {
  offsetPagination: OffsetPaginationPageInfo;
  currentPage?: number;
  slug: string;
  taxonomy: string;
}

const Pagination: React.FC<Props> = ({
  offsetPagination,
  currentPage,
  slug,
  taxonomy,
}) => {
  const count = 20;
  const totalPages = Math.ceil(offsetPagination.total / count);
  const pageArray = Array.from(Array(totalPages).keys());
  const olderPage = currentPage < totalPages ? currentPage + 1 : null;
  const newerPage = currentPage > 1 ? currentPage - 1 : null;
  const basePath = `/${taxonomy}/${slug}/`;
  return (
    <div className={styles['pagination']}>
      {newerPage && currentPage !== 2 && (
        <Link href={`${basePath}${currentPage - 1}`}>
          <a>{'< newer'}</a>
        </Link>
      )}
      {newerPage && currentPage == 2 && (
        <Link href={basePath}>
          <a>{'< newer'}</a>
        </Link>
      )}
      <ul className={styles['numbersList']}>
        {pageArray.map((item) => (
          <li
            key={item}
            className={cx(styles['listItem'], {
              [styles['listItem--active']]: item + 1 === currentPage,
            })}
          >
            {item > 0 && (
              <Link key={item} href={`${basePath}${item + 1}`}>
                <a>{item + 1}</a>
              </Link>
            )}
            {item === 0 && (
              <Link key={item} href={basePath}>
                <a>{item + 1}</a>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {olderPage && (
        <Link href={`${basePath}${currentPage + 1}`}>
          <a>{'older >'}</a>
        </Link>
      )}
    </div>
  );
};
export default Pagination;

import Link from 'next/link';
import { OffsetPaginationPageInfo } from 'types';
import styles from './Pagination.module.scss';

interface Props {
  offsetPagination: OffsetPaginationPageInfo;
  currentPage?: number;
  slug: string;
}

const Pagination: React.FC<Props> = ({
  offsetPagination,
  currentPage,
  slug,
}) => {
  const count = 20;
  const totalPages = Math.ceil(offsetPagination.total / count);
  const pageArray = Array.from(Array(totalPages).keys());
  const olderPage = currentPage < totalPages ? currentPage + 1 : null;
  const newerPage = currentPage > 1 ? currentPage - 1 : null;

  return (
    <div className={styles['pagination']}>
      {newerPage && currentPage !== 2 && (
        <Link href={`/category/${slug}/${currentPage - 1}`}>
          <a>{'< newer'}</a>
        </Link>
      )}
      {newerPage && currentPage == 2 && (
        <Link href={`/category/${slug}/`}>
          <a>{'< newer'}</a>
        </Link>
      )}
      {pageArray.map((item) => (
        <>
          {item > 0 && (
            <Link key={item} href={`/category/${slug}/${item + 1}`}>
              <a>{item + 1}</a>
            </Link>
          )}
          {item === 0 && (
            <Link key={item} href={`/category/${slug}/`}>
              <a>{item + 1}</a>
            </Link>
          )}
        </>
      ))}
      {olderPage && (
        <Link href={`/category/${slug}/${currentPage + 1}`}>
          <a>{'older >'}</a>
        </Link>
      )}
    </div>
  );
};
export default Pagination;

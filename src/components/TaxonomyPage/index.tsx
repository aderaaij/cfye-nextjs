import { useRouter } from 'next/router';
import { CategoryPostsOffsetQuery } from 'types';
import { returnPageString, returnSlugString } from 'utils/helpers';
import ExcerptHero from '../ExcerptHero';
import MetaPage from '../MetaPage';
import Pagination from '../Pagination';

interface Props {
  posts: CategoryPostsOffsetQuery['categoryPosts'];
  details: any;
  taxonomy: string;
}

const TaxonomyPage: React.FC<Props> = ({ posts, details, taxonomy }) => {
  const postCount = 20;
  const { offsetPagination } = posts.pageInfo;
  const totalPages = Math.ceil(offsetPagination.total / postCount);
  const router = useRouter();
  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };
  return (
    <>
      {details && (
        <MetaPage
          description={details.description}
          title={`${details.name} - page ${returnPageString(router)}`}
          image={posts.edges[0]?.node.featuredImage?.node.sourceUrl}
        />
      )}
      <div className="category-wrap">
        {posts.edges.map(({ node }, index) => (
          <ExcerptHero key={node.id} post={node} isEven={isEven(index)} />
        ))}
        {totalPages > 1 && (
          <Pagination
            offsetPagination={posts.pageInfo.offsetPagination}
            slug={returnSlugString(router)}
            taxonomy={taxonomy}
            currentPage={
              returnPageString(router) ? parseInt(returnPageString(router)) : 1
            }
          />
        )}
      </div>
    </>
  );
};

export default TaxonomyPage;

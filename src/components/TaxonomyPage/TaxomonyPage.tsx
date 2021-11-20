import { useRouter } from 'next/router';
import { CategoryPostsOffsetQuery } from 'types';
import { returnPageString, returnSlugString } from 'utils/helpers';
import { ExcerptFeature } from '@/components/PostExcerpts';
import { PageMeta, Pagination } from '@/components/Shared';

interface Props {
  posts: CategoryPostsOffsetQuery['categoryPosts'];
  details: any;
  taxonomy: string;
}

export const TaxonomyPage: React.FC<Props> = ({ posts, details, taxonomy }) => {
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
        <PageMeta
          description={details.description}
          title={`${details.name} - Page ${
            returnPageString(router) ? returnPageString(router) : 1
          }`}
          image={posts.edges[0]?.node.featuredImage?.node.sourceUrl}
        />
      )}
      <div className="container">
        <div className="category-wrap">
          {posts.edges.map(({ node }, index) => (
            <ExcerptFeature
              key={node.id}
              post={node}
              isEven={isEven(index)}
              type="small"
            />
          ))}
          {totalPages > 1 && (
            <Pagination
              offsetPagination={posts.pageInfo.offsetPagination}
              slug={returnSlugString(router)}
              taxonomy={taxonomy}
              currentPage={
                returnPageString(router)
                  ? parseInt(returnPageString(router))
                  : 1
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

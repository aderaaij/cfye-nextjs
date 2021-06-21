import { PostExcerptFieldsFragment } from 'types';
import ExcerptHero from '../ExcerptHero';

interface Props {
  posts: Array<PostExcerptFieldsFragment>;
}

const MoreStories: React.FC<Props> = ({ posts }) => {
  return (
    <section>
      {posts.map(({ node }) => (
        <ExcerptHero key={node.id} post={node} />
      ))}
    </section>
  );
};

export default MoreStories;

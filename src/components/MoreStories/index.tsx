import { PostExcerptFieldsFragment } from 'types';
import HeroPost from '../HeroPost';

interface Props {
  posts: Array<PostExcerptFieldsFragment>;
}

const MoreStories: React.FC<Props> = ({ posts }) => {
  return (
    <section>
      {posts.map(({ node }) => (
        <HeroPost key={node.id} post={node} />
      ))}
    </section>
  );
};

export default MoreStories;

import PostPreview from '@/components/PostPreview';
import { RootQueryToPostConnection } from 'types';
import HeroPost from '../HeroPost';

interface Props {
  posts: RootQueryToPostConnection['edges'];
}

const MoreStories: React.FC<Props> = ({ posts }) => {
  return (
    <section>
      {posts.map(({ node }) => (
        <HeroPost
          key={node.id}
          title={node.title}
          coverImage={node.featuredImage?.node}
          date={node.date}
          author={node.author.node}
          slug={node.slug}
          excerpt={node.excerpt}
        />
      ))}
    </section>
  );
};

export default MoreStories;

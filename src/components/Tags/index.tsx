import { PostToTagConnection } from 'types';

interface Props {
  tags: PostToTagConnection;
}

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <div>
      <p>
        Tagged
        {tags.edges.map((tag, index) => (
          <span key={index}>{tag.node.name}</span>
        ))}
      </p>
    </div>
  );
};
export default Tags;

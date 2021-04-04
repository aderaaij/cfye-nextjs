import { PostToCategoryConnection } from 'types';

interface Props {
  categories: PostToCategoryConnection;
}

const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <span>
      under
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => (
          <span key={index}>{category?.node.name}</span>
        ))
      ) : (
        <span>Whatevs</span>
      )}
    </span>
  );
};
export default Categories;

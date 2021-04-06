const PostTitle: React.FC<any> = ({ children }) => (
  <h1 dangerouslySetInnerHTML={{ __html: children }} />
);
export default PostTitle;

const PostTitle: React.FC<any> = ({ children }) => (
  <h1
    className="text-6xl md:text-7xl lg:text-7xl text-cfye font-medium tracking-tighter leading-tight md:leading-none mb-12 font-header text-center"
    dangerouslySetInnerHTML={{ __html: children }}
  />
);
export default PostTitle;

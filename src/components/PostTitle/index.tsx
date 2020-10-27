const PostTitle: React.FC<any> = ({ children }) => (
  <h1
    className="text-3xl md:text-6xl lg:text-7xl text-cfye font-medium tracking-tighter leading-tight md:leading-none my-12 font-header text-left lg:text-center"
    dangerouslySetInnerHTML={{ __html: children }}
  />
);
export default PostTitle;

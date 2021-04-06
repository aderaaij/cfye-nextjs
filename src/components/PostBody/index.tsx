import parse from 'html-react-parser';
import { Fragment } from 'react';
import { Block } from 'types';

interface BlockWithTypeName extends Block {
  __typename: string;
}
interface Props {
  content: string;
  blocks: Array<BlockWithTypeName>;
}
const PostBody: React.FC<Props> = ({ blocks }) => {
  return (
    <div className="entry-content">
      {blocks.map((block) => (
        <Fragment key={block.order}>{parse(block.saveContent)}</Fragment>
      ))}
    </div>
  );
};

export default PostBody;

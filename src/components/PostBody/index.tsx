import parse from 'html-react-parser';
import { Fragment } from 'react';
import { Block } from 'types';
import PostEmbed from '@/components/PostEmbed';

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
      {blocks.map((block) => {
        if (block.__typename !== 'CoreEmbedBlock') {
          return (
            <Fragment key={block.order}>{parse(block.saveContent)}</Fragment>
          );
        }
        return <PostEmbed key={block.order} content={block.saveContent} />;
      })}
      <hr className="entry-content__hr" />
    </div>
  );
};

export default PostBody;

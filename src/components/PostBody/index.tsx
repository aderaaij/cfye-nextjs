import parse from 'html-react-parser';
import cx from 'classnames';
import { Block } from 'types';
import PostEmbed from '@/components/PostEmbed';

import styles from './PostBody.module.scss';
interface BlockWithTypeName extends Block {
  __typename: string;
}
interface Props {
  content: string;
  blocks: Array<BlockWithTypeName>;
}
const PostBody: React.FC<Props> = ({ blocks }) => {
  return (
    <div className="container">
      <div className={cx('container__full-width', styles['post-body'])}>
        {blocks.map((block) => {
          if (block.__typename === 'CoreEmbedBlock') {
            return <PostEmbed key={block.order} content={block.saveContent} />;
          } else if (block.__typename === 'CoreParagraphBlock') {
            return (
              <div key={block.order} className={styles['paragraph-container']}>
                {parse(block.saveContent)}
              </div>
            );
          } else if (block.__typename === 'CoreGalleryBlock') {
            return (
              <div key={block.order} className={styles['gallery-container']}>
                {parse(block.saveContent)}
              </div>
            );
          } else if (block.__typename === 'CoreImageBlock') {
            return (
              <div
                key={block.order}
                className={cx(styles['image-container'], {
                  [styles['image-container--full']]: block.saveContent.includes(
                    'is-style-cover-screen'
                  ),
                })}
              >
                {parse(block.saveContent)}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PostBody;

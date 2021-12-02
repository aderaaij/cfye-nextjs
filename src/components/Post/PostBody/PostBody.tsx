import parse from 'html-react-parser';
import cx from 'classnames';
import { Post } from 'types';

import styles from './PostBody.module.scss';
import { PostGallery } from '../PostGallery';
import { Fragment } from 'react';

interface Props {
  content: Post['content'];
  blocks: Post['blocks'];
}

export const PostBody: React.FC<Props> = ({ blocks }) => {
  return (
    <div className="container">
      <div className={cx('container__full-width', styles['post-body'])}>
        {/* {content ? parse(content) : null} */}

        {blocks.map((block, index) => {
          switch (block.name) {
            case 'core/paragraph':
              return (
                <Fragment key={index}>{parse(block.saveContent)}</Fragment>
              );
            case 'core/image':
              return <Fragment key={index}>{parse(block.cdnContent)}</Fragment>;
            case 'core/gallery':
              return <PostGallery key={index} block={block} />;
          }
        })}
      </div>
    </div>
  );
};

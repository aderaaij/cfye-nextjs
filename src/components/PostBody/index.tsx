import parse from 'html-react-parser';
import cx from 'classnames';
import { Block } from 'types';

import styles from './PostBody.module.scss';
interface BlockWithTypeName extends Block {
  __typename: string;
}
interface Props {
  content: string;
  blocks: Array<BlockWithTypeName>;
}
const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className="container">
      <div className={cx('container__full-width', styles['post-body'])}>
        {parse(content)}
      </div>
    </div>
  );
};

export default PostBody;

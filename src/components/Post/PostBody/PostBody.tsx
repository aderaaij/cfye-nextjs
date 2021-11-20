import parse from 'html-react-parser';
import cx from 'classnames';
import { Post } from 'types';

import styles from './PostBody.module.scss';

interface Props {
  content: Post['content'];
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className="container">
      <div className={cx('container__full-width', styles['post-body'])}>
        {content ? parse(content) : null}
      </div>
    </div>
  );
};

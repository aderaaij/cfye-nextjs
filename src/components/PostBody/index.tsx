import styles from './post-body.module.css';

interface Props {
  content: string;
}
const PostBody: React.FC<Props> = ({ content }) => (
  <div className="post-body  pb-16">
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

export default PostBody;

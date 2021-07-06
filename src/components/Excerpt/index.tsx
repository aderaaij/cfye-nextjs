import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { PostExcerptFieldsFragment } from 'types';
import TagList from '../TagList';
import styles from './Excerpt.module.scss';

interface Props {
  node: PostExcerptFieldsFragment['node'];
}

const Excerpt: React.FC<Props> = ({ node }) => {
  return (
    <article className={styles['article']}>
      <div className={styles['image-wrap']}>
        <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
          <a>
            <Image
              placeholder="blur"
              blurDataURL={node.featuredImage.node.thumbnail}
              src={node.featuredImage.node.sourceUrl}
              className={styles['image']}
              width={1200}
              height={800}
              layout="intrinsic"
              objectFit="cover"
            />
          </a>
        </Link>
      </div>

      <div className={styles['text-wrap']}>
        <h3 className={styles['title']}>
          <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
            <a>{node.title}</a>
          </Link>
        </h3>
        <TagList tags={node.tags} context="articleExcerpt" />
        <div className={styles['text']}>{parse(node.excerpt)}</div>
      </div>
    </article>
  );
};
export default Excerpt;

import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'types';
import TagList from '@/components/TagList';
import styles from './ArticleExcerptSmall.module.scss';

interface Dimensions {
  width: number;
  height: number;
}
interface Props {
  node: Post;
  dimensions?: Dimensions;
}

const ArticleExcerptSmall: React.FC<Props> = ({
  node,
  dimensions = { width: 600, height: 400 },
}) => {
  return (
    <article className={styles['article']}>
      <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
        <a className={styles['image-link']}>
          <Image
            src={node.featuredImage.node.sourceUrl}
            layout="fill"
            objectFit="cover"
          />
        </a>
      </Link>
      <div className={styles['content']}>
        <TagList tags={node.tags} context="articleExcerpt" />
        <h3 className={styles['title']}>
          <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
            <a>{node.title}</a>
          </Link>
        </h3>
      </div>
    </article>
  );
};

export default ArticleExcerptSmall;

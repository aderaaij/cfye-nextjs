import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'types';
import TagList from '@/components/TagList';
import styles from './ArticleExcerptSmall.module.scss';

interface Props {
  node: Post;
}
const ArticleExcerptSmall: React.FC<Props> = ({ node }) => {
  return (
    <article className={styles['article']}>
      <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
        <a>
          <Image
            src={node.featuredImage.node.sourceUrl}
            width={600}
            height={400}
            objectFit="fill"
          />
        </a>
      </Link>
      <TagList tags={node.tags} context="articleExcerpt" />
      <h3 className={styles['title']}>
        <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
          <a>{node.title}</a>
        </Link>
      </h3>
    </article>
  );
};

export default ArticleExcerptSmall;

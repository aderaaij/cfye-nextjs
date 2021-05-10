import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'types';
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
            objectFit="cover"
          />
        </a>
      </Link>
      {node.tags && (
        <div className={styles['tag-list-wrap']}>
          <span>tagged:</span>
          <ul className={styles['tag-list']}>
            {node.tags.edges.map(({ node }) => {
              return (
                <li key={node.name}>
                  <Link as={`/tag/${node.slug}`} href="/tag/[slug]">
                    <a>{node.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <h3 className={styles['title']}>
        <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
          <a>{node.title}</a>
        </Link>
      </h3>
    </article>
  );
};

export default ArticleExcerptSmall;

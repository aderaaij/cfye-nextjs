import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { PostExcerptFieldsFragment } from 'types';
import TagList from '@/components/TagList';
import styles from './Excerpt.module.scss';

interface Props {
  node: PostExcerptFieldsFragment['node'];
  type?: 'small';
}

const Excerpt: React.FC<Props> = ({ node, type }) => {
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
        <div className={styles['taxonomy-wrap']}>
          <TagList tags={node.categories} context="articleExcerpt" />
          <TagList tags={node.tags} context="articleExcerpt" />
        </div>
        <h3
          className={cx(styles['title'], {
            [styles[`title--${type}`]]: type,
          })}
        >
          <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
            <a>{node.title}</a>
          </Link>
        </h3>
      </div>
    </article>
  );
};
export default Excerpt;

import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { PostExcerptFieldsFragment } from 'types';
import { TagList } from '@/components/Shared';
import styles from './Excerpt.module.scss';
import { motion, Variants } from 'framer-motion';

interface Props {
  node: PostExcerptFieldsFragment['node'];
  type?: 'small';
}

export const Excerpt: React.FC<Props> = ({ node, type }) => {
  const variants: Variants = {
    open: {
      opacity: 1,
      scale: 1,
    },
    closed: {
      scale: 0.6,
      opacity: 0,
    },
  };
  return (
    <motion.article className={styles['article']} variants={variants}>
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
    </motion.article>
  );
};

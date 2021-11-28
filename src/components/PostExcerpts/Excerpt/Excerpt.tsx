import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { PostExcerptFieldsFragment } from 'types';
import { TagList } from '@/components/Shared';
import styles from './Excerpt.module.scss';
import { motion, Variants } from 'framer-motion';
import { usePlaiceholderStateContext } from 'contexts/PlaiceholderContext';
import { useEffect, useState } from 'react';

interface Props {
  node: PostExcerptFieldsFragment['node'];
  type?: 'small';
}

const variants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    scale: 1,
    opacity: 1,
  },
};

export const Excerpt: React.FC<Props> = ({ node, type }) => {
  const { featuredImage, categories, tags, title, slug } = node;
  const [plaiceholder, setPlaiceholder] = useState(null);
  const plaiceholderState = usePlaiceholderStateContext();

  useEffect(() => {
    if (plaiceholderState[featuredImage.node.id]) {
      setPlaiceholder(plaiceholderState[featuredImage.node.id]);
    }
  }, [plaiceholderState, featuredImage.node.id]);

  return (
    <motion.article className={styles['article']} variants={variants}>
      <div className={styles['image-wrap']}>
        <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
          <a>
            <Image
              {...(plaiceholder ? { placeholder: 'blur' } : {})}
              {...(plaiceholder ? { blurDataURL: plaiceholder.base64 } : {})}
              alt=""
              src={featuredImage.node.sourceUrl}
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
          <TagList tags={categories} context="articleExcerpt" />
          <TagList tags={tags} context="articleExcerpt" />
        </div>
        <h3
          className={cx(styles['title'], {
            [styles[`title--${type}`]]: type,
          })}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a>{title}</a>
          </Link>
        </h3>
      </div>
    </motion.article>
  );
};

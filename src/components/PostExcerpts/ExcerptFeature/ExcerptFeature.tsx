import parse from 'html-react-parser';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import { PostExcerptFieldsFragment } from 'types';
import { limitText } from 'utils/limitCharacters';
import { TagList, Button } from '@/components/Shared';
import styles from './ExcerptFeature.module.scss';
import { useEffect, useState } from 'react';
import { usePlaiceholderStateContext } from 'contexts/PlaiceholderContext';

const imageVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        type: 'spring',
        stiffness: 150,
        bounce: 0,
        damping: 10,
      },
    },
  },
  closed: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        type: 'spring',
      },
    },
  },
};

const childVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: 100,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const imageSizes = {
  hero: { width: 900, height: 900 },
  small: { width: 900, height: 600 },
};

const contentVariants = {
  open: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const characterLimit = {
  hero: 400,
  small: 120,
};

interface Props {
  post: PostExcerptFieldsFragment['node'];
  image?: any;
  isEven?: boolean;
  type?: 'hero' | 'small';
}

export const ExcerptFeature: React.FC<Props> = ({
  post,
  isEven,
  type = 'hero',
}) => {
  const {
    slug,
    featuredImageSettings,
    title,
    featuredImage,
    categories,
    author,
    tags,
    excerpt,
  } = post;

  const [isOpen, setOpen] = useState(false);

  const [plaiceholder, setPlaiceholder] = useState(null);

  const [containerRef, inView] = useInView({ threshold: 0.5 });

  const plaiceholderState = usePlaiceholderStateContext();

  useEffect(() => {
    if (plaiceholderState[featuredImage.node.id]) {
      setPlaiceholder(plaiceholderState[featuredImage.node.id]);
    }
  }, [plaiceholderState, featuredImage.node.id]);

  useEffect(() => {
    if (inView) {
      setOpen(true);
    }
  }, [inView]);

  return (
    <motion.article
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={containerRef}
      className={cx(styles['featured-post'], {
        [styles['hero-post--is-even']]: isEven,
      })}
    >
      {post.featuredImage && (
        <motion.div
          variants={imageVariants}
          layoutId={`image-${slug}`}
          className={styles['image-wrap']}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a
              className={cx({ [styles['image-link']]: type === 'hero' })}
              style={
                featuredImageSettings.backgroundColor
                  ? { backgroundColor: featuredImageSettings.backgroundColor }
                  : null
              }
            >
              {type === 'hero' ? (
                <Image
                  className={styles['image']}
                  placeholder={plaiceholder ? 'blur' : 'empty'}
                  {...(plaiceholder
                    ? { blurDataURL: plaiceholder.base64 }
                    : {})}
                  src={featuredImage.node.sourceUrl}
                  quality={90}
                  objectFit={
                    featuredImageSettings.imageFit as ImageProps['objectFit']
                  }
                  layout={'fill'}
                  alt={title}
                />
              ) : (
                <Image
                  className={styles['image']}
                  placeholder={plaiceholder ? 'blur' : 'empty'}
                  {...(plaiceholder
                    ? { blurDataURL: plaiceholder.base64 }
                    : {})}
                  src={featuredImage.node.sourceUrl}
                  quality={90}
                  objectFit={
                    featuredImageSettings.imageFit as ImageProps['objectFit']
                  }
                  layout="responsive"
                  width={imageSizes[type].width}
                  height={imageSizes[type].height}
                  alt={title}
                />
              )}
            </a>
          </Link>
        </motion.div>
      )}
      <motion.div variants={contentVariants} className={styles['content-wrap']}>
        <motion.div variants={childVariants} className={styles['meta-top']}>
          {categories && (
            <TagList isEven={isEven} tags={categories} context="heroExcerpt" />
          )}
          {tags && (
            <TagList isEven={isEven} tags={tags} context="heroExcerpt" />
          )}
        </motion.div>

        <motion.div
          variants={childVariants}
          className={cx(styles['content'], {
            [styles[`content--${type}`]]: type === 'small',
          })}
        >
          <div className={styles['author-wrap']}>
            By {author.node.firstName} {author.node.lastName}
          </div>

          <h3
            className={cx(styles['title'], {
              [styles['title--small']]: type === 'small',
            })}
          >
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a>{limitText(title, 60)} </a>
            </Link>
          </h3>

          <div className={styles['text-wrap']}>
            {parse(limitText(excerpt, characterLimit[type]))}
          </div>
        </motion.div>

        <motion.div variants={childVariants} className={styles['meta-bottom']}>
          {type === 'hero' && (
            <Button
              type="link"
              as={`/posts/${slug}`}
              url="/posts/[slug]"
              text="read more"
            />
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

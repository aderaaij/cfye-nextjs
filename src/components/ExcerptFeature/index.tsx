import parse from 'html-react-parser';
import Link from 'next/link';
import { PostExcerptFieldsFragment } from 'types';
import cx from 'classnames';
import CoverImage from '@/components/CoverImage';
import { limitText } from 'utils/limitCharacters';
import { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import TagList from '@/components/TagList';
import styles from './ExcerptFeature.module.scss';
import Button from '../Button';

interface Props {
  post: PostExcerptFieldsFragment['node'];
  isEven?: boolean;
  type?: 'hero' | 'small';
}

const ExcerptFeature: React.FC<Props> = ({ post, isEven, type = 'hero' }) => {
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

  const imageSizes = {
    hero: { width: 900, height: 900 },
    small: { width: 900, height: 600 },
  };

  const characterLimit = {
    hero: 400,
    small: 120,
  };
  return (
    <article
      className={cx(styles['featured-post'], {
        [styles['hero-post--is-even']]: isEven,
      })}
    >
      {post.featuredImage && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          layoutId={`image-${slug}`}
          className={styles['image-wrap']}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a>
              <CoverImage
                absolute={true}
                objectFit={
                  featuredImageSettings.imageFit as ImageProps['objectFit']
                }
                backgroundColor={featuredImageSettings.backgroundColor}
                cover={true}
                title={title}
                sizes={imageSizes[type]}
                coverImage={featuredImage.node}
              />
            </a>
          </Link>
        </motion.div>
      )}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        className={styles['content-wrap']}
      >
        <div className={styles['meta-top']}>
          {categories && (
            <TagList isEven={isEven} tags={categories} context="heroExcerpt" />
          )}
          {tags && (
            <TagList isEven={isEven} tags={tags} context="heroExcerpt" />
          )}
        </div>

        <div className={styles['content']}>
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
        </div>

        <div className={styles['meta-bottom']}>
          {type === 'hero' && (
            <Button
              type="link"
              as={`/posts/${slug}`}
              url="/posts/[slug]"
              text="read more"
            />
          )}
        </div>
      </motion.div>
    </article>
  );
};
export default ExcerptFeature;

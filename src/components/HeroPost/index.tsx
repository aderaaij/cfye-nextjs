import parse from 'html-react-parser';
import Link from 'next/link';
import { Post } from 'types';
import cx from 'classnames';
import CoverImage from '@/components/CoverImage';
import { limitText } from 'utils/limitCharacters';
import { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import TagList from '@/components/TagList';
import styles from './HeroPost.module.scss';
interface Props {
  post: Post;
  isEven?: boolean;
}

const HeroPost: React.FC<Props> = ({ post, isEven }) => {
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
  return (
    <article
      className={cx(styles['hero-post'], {
        [styles['hero-post--is-even']]: isEven,
      })}
    >
      {post.featuredImage && (
        <motion.div layoutId={`image-${slug}`} className={styles['image-wrap']}>
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
                coverImage={featuredImage.node}
              />
            </a>
          </Link>
        </motion.div>
      )}
      <div className={styles['title-wrap']}>
        <motion.h3
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          layoutId={`title-${slug}`}
          className={styles['title']}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a>{limitText(title, 60)} </a>
          </Link>
        </motion.h3>
        {categories && (
          <ul className={styles['category']}>
            {categories.edges.map(({ node }) => {
              return (
                <li key={node.name}>
                  <Link as={`/category/${node.slug}`} href="/category/[slug]">
                    <a>{node.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className={styles['author-wrap']}>
        Written by{' '}
        <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
          <a>
            {author.node.firstName} {author.node.lastName}
          </a>
        </Link>
        {tags && <TagList tags={tags} context="heroExcerpt" />}
      </div>

      <div className={styles['text-wrap']}>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{parse(excerpt)}</a>
        </Link>
      </div>
    </article>
  );
};
export default HeroPost;

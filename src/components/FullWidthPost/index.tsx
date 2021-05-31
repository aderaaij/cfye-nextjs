import Link from 'next/link';
import { Post } from 'types';
import CoverImage from '@/components/CoverImage';
import { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import styles from './FullWidthPost.module.scss';
interface Props {
  post: Post;
}

const FullWidthPost: React.FC<Props> = ({ post }) => {
  const { featuredImage, slug, featuredImageSettings, title } = post;
  return (
    <article className={styles['fullwidth-post']}>
      {featuredImage && (
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
      {/* <div className={styles['title-wrap']}>
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
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>
            {author.firstName} {author.lastName}
          </a>
        </Link>
      </div>

      <div className={styles['text-wrap']}>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{parse(excerpt)}</a>
        </Link>
      </div> */}
    </article>
  );
};
export default FullWidthPost;

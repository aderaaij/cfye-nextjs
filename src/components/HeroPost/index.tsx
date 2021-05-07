import parse from 'html-react-parser';
import Link from 'next/link';
import { RootQueryToPostConnection, Post } from 'types';
import CoverImage from '@/components/CoverImage';
import {
  MediaItem,
  NodeWithAuthorToUserConnectionEdge,
  Post_Featuredimagesettings,
} from 'types';
import { limitText } from 'utils/limitCharacters';
import { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import styles from './HeroPost.module.scss';
interface Props {
  title: string;
  coverImage: MediaItem;
  date: string;
  excerpt: string;
  author: NodeWithAuthorToUserConnectionEdge['node'];
  slug: string;
  isEven?: boolean;
  imageSettings?: Post_Featuredimagesettings;
  categories?: Post['categories'];
}

const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  excerpt,
  slug,
  author,
  imageSettings,
  categories,
}) => {
  return (
    <article className={styles['hero-post']}>
      <motion.div layoutId={`image-${slug}`} className={styles['image-wrap']}>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>
            <CoverImage
              absolute={true}
              objectFit={imageSettings.imageFit as ImageProps['objectFit']}
              backgroundColor={imageSettings.backgroundColor}
              cover={true}
              title={title}
              coverImage={coverImage}
            />
          </a>
        </Link>
      </motion.div>
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
      </div>
    </article>
  );
};
export default HeroPost;

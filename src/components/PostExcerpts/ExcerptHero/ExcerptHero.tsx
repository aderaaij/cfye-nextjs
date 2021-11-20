import Link from 'next/link';
import { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { PostExcerptFieldsFragment } from 'types';
import cx from 'classnames';
import { limitText } from 'utils/limitCharacters';
import { TagList, Button, CoverImage } from '@/components/Shared';
import styles from './ExcerptHero.module.scss';

interface Props {
  post: PostExcerptFieldsFragment['node'];
  isEven?: boolean;
}

export const ExcerptHero: React.FC<Props> = ({ post, isEven }) => {
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
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          layoutId={`image-${slug}`}
          className={styles['image-wrap']}
        >
          <Link href="/posts/[slug]">
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
        <motion.h3 layoutId={`title-${slug}`} className={styles['title']}>
          <Link href="/posts/[slug]">
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
        Written by {author.node.firstName} {author.node.lastName}
        {tags && <TagList isEven={isEven} tags={tags} context="heroExcerpt" />}
      </div>

      <div className={styles['text-wrap']}>
        <Link href="/posts/[slug]">
          <a className={styles['text-link']}>{parse(excerpt)}</a>
        </Link>
        <Button
          type="link"
          as={`/posts/${slug}`}
          url="/posts/[slug]"
          text="read more"
        />
      </div>
    </article>
  );
};

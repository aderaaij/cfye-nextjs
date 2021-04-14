import parse from 'html-react-parser';
import Link from 'next/link';
import CoverImage from '@/components/CoverImage';
import styles from './HeroPost.module.scss';

import {
  MediaItem,
  NodeWithAuthorToUserConnectionEdge,
  Post_Featuredimagesettings,
} from 'types';
import { limitText } from 'utils/limitCharacters';
import { ImageProps } from 'next/image';
interface Props {
  title: string;
  coverImage: MediaItem;
  date: string;
  excerpt: string;
  author: NodeWithAuthorToUserConnectionEdge['node'];
  slug: string;
  isEven?: boolean;
  imageSettings?: Post_Featuredimagesettings;
}

const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  excerpt,
  slug,
  author,
  imageSettings,
}) => {
  return (
    <article className={styles['hero-post']}>
      <div className={styles['image-wrap']}>
        <Link as={`/${slug}`} href="/[slug]">
          <a aria-label={title}>
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
      </div>

      <h3 className={styles['title']}>
        <Link as={`/${slug}`} href="/[slug]">
          <a>{limitText(title, 60)} </a>
        </Link>
      </h3>
      <div className={styles['author-wrap']}>
        Written by{' '}
        <Link as={`/${slug}`} href="/[slug]">
          <a>
            {author.firstName} {author.lastName}
          </a>
        </Link>
      </div>

      <div className={styles['text-wrap']}>
        <Link as={`/${slug}`} href="/[slug]">
          <a>{parse(excerpt)}</a>
        </Link>
      </div>
    </article>
  );
};
export default HeroPost;

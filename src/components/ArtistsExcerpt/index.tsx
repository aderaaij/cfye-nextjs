import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import CoverImage from '@/components/CoverImage';
import styles from './ArtistsExcerpt.module.scss';

import { MediaItem, Post_Featuredimagesettings } from 'types';
import { limitText } from 'utils/limitCharacters';
import { ImageProps } from 'next/image';

interface Props {
  title: string;
  image: MediaItem;

  slug: string;
}

const ArtistsExcerpt: React.FC<Props> = ({ title, image, slug }) => {
  return (
    <article className={styles['hero-post']}>
      <div className={styles['image-wrap']}>
        <Link as={`/${slug}`} href="/[slug]">
          <a aria-label={title}></a>
        </Link>
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '300px',
        }}
      >
        <Image src={image.sourceUrl} layout="fill" />
      </div>

      <h3 className={styles['title']}>
        <Link as={`/${slug}`} href="/[slug]">
          <a>{limitText(title, 60)} </a>
        </Link>
      </h3>
    </article>
  );
};
export default ArtistsExcerpt;

import Image from 'next/image';
import Link from 'next/link';
import styles from './ArtistsExcerpt.module.scss';
import { MediaItem } from 'types';
import { limitText } from 'utils/limitCharacters';

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

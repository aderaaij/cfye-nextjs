import Link from 'next/link';
import Image from 'next/image';
import { MediaItem } from 'types';
import styles from './CoverImage.module.css';
import cn from 'classnames';
interface Props {
  title: string;
  coverImage: MediaItem;
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
  objectFit?: string;
  backgroundColor?: string;
  priority?: boolean;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  priority = false,
  slug,
  objectFit = 'contain',
  cover,
}) => {
  console.log({ objectFit, cover });

  const image = (
    <Image
      src={coverImage.sourceUrl}
      layout="fill"
      quality={90}
      priority={priority}
    />
  );
  return (
    <div className={styles['wrapper']}>
      {slug ? (
        <Link as={`/${slug}`} href="/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};
export default CoverImage;

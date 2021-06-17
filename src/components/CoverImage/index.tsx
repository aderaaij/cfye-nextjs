import Image, { ImageProps } from 'next/image';
import { MediaItem } from 'types';
import styles from './CoverImage.module.scss';

type Sizes = {
  width: number;
  height: number;
};

interface Props {
  title: string;
  coverImage: MediaItem & { thumbnail: string };
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
  objectFit?: ImageProps['objectFit'];
  backgroundColor?: string;
  priority?: boolean;
  sizes?: Sizes;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  objectFit = 'cover',
  backgroundColor: bg,
  priority = false,
  sizes = { width: 1200, height: 800 },
}) => {
  return (
    <div className={styles['wrapper']} style={{ backgroundColor: bg }}>
      <Image
        placeholder="blur"
        blurDataURL={coverImage.thumbnail}
        src={coverImage.sourceUrl}
        quality={90}
        priority={priority}
        objectFit={objectFit}
        layout="responsive"
        width={sizes.width}
        height={sizes.height}
        alt={title}
      />
    </div>
  );
};
export default CoverImage;

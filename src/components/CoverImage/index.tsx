import Image, { ImageProps } from 'next/image';
import { MediaItem } from 'types';
import styles from './CoverImage.module.scss';
interface Props {
  title: string;
  coverImage: MediaItem;
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
  objectFit?: ImageProps['objectFit'];
  backgroundColor?: string;
  priority?: boolean;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  slug,
  absolute,
  objectFit = 'cover',
  backgroundColor: bg,
  priority = false,
}) => {
  return (
    <div className={styles['wrapper']} style={{ backgroundColor: bg }}>
      <Image
        src={coverImage.sourceUrl}
        layout="fill"
        quality={90}
        priority={priority}
        objectFit={objectFit}
      />
    </div>
  );
};
export default CoverImage;

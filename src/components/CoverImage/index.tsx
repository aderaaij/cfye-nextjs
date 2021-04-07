import Image, { ImageProps } from 'next/image';
import { MediaItem } from 'types';
import styles from './CoverImage.module.scss';
interface Props {
  title: string;
  coverImage: MediaItem;
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
  objectFit?: ImageProps['objectFit'] | string;
  backgroundColor?: string;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  slug,
  absolute,
  objectFit = 'cover',
  backgroundColor: bg,
}) => {
  return (
    <div className={styles['wrapper']}>
      <Image
        src={coverImage.sourceUrl}
        layout="fill"
        quality={90}
        priority={true}
        objectFit={objectFit}
      />
    </div>
  );
};
export default CoverImage;

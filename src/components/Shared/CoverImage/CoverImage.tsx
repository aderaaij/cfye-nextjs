import { usePlaiceholderStateContext } from 'contexts/PlaiceholderContext';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import { FeaturedImageFieldsFragment } from 'types';
import styles from './CoverImage.module.scss';

type Sizes = {
  width: number;
  height: number;
};

interface Props {
  title: string;
  coverImage: FeaturedImageFieldsFragment['node'];
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
  objectFit?: ImageProps['objectFit'];
  backgroundColor?: string;
  priority?: boolean;
  sizes?: Sizes;
}

export const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  objectFit = 'cover',
  backgroundColor: bg,
  priority = false,
  sizes = { width: 1200, height: 800 },
}) => {
  const [plaiceholder, setPlaiceholder] = useState(null);
  const plaiceholderState = usePlaiceholderStateContext();

  useEffect(() => {
    if (plaiceholderState[coverImage.id]) {
      setPlaiceholder(plaiceholderState[coverImage.id]);
    }
  }, [plaiceholderState, coverImage.id]);

  return (
    <div className={styles['wrapper']} style={{ backgroundColor: bg }}>
      <Image
        className={styles['image']}
        placeholder={plaiceholder ? 'blur' : 'empty'}
        {...(plaiceholder ? { blurDataURL: plaiceholder.base64 } : {})}
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

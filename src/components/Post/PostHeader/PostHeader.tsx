import { ImageProps } from 'next/image';
import { Date, CoverImage } from '@/components/Shared';
import styles from './PostHeader.module.scss';

import {
  FeaturedImageFieldsFragment,
  PostToCategoryConnection,
  Post_Featuredimagesettings,
  User,
} from 'types';
import { motion } from 'framer-motion';
interface Props {
  title: string;
  coverImage?: FeaturedImageFieldsFragment['node'];
  date: string;
  author?: User;
  categories?: PostToCategoryConnection;
  isEven?: boolean;
  featuredImageSettings?: Post_Featuredimagesettings;
  slug?: string;
}
export const PostHeader: React.FC<Props> = ({
  title,
  coverImage,
  date,
  featuredImageSettings,
  slug,
  author,
}) => {
  return (
    <div className={styles['post-header']}>
      <motion.div layoutId={`image-${slug}`} className={styles['image-wrap']}>
        {coverImage && (
          <>
            {/* <Image
              className={styles['image']}
              placeholder="blur"
              blurDataURL={coverImage.thumbnail}
              src={coverImage.sourceUrl}
              quality={90}
              priority={true}
              objectFit={
                featuredImageSettings.imageFit as ImageProps['objectFit']
              }
              width={1600}
              height={900}
              alt={title}
            /> */}
            <CoverImage
              absolute={false}
              objectFit={
                featuredImageSettings.imageFit as ImageProps['objectFit']
              }
              backgroundColor={featuredImageSettings.backgroundColor}
              title={title}
              coverImage={coverImage}
              priority={true}
              sizes={{ width: 1600, height: 900 }}
            />
          </>
        )}
      </motion.div>
      <header className={styles['title-wrap']}>
        <h3 className={styles['title']}>{title}</h3>
        <div className={styles['header-meta']}>
          <Date dateString={date} />
          <span className={styles['author-meta']}>
            By {author.firstName} {author.lastName}
          </span>
        </div>
      </header>
    </div>
  );
};

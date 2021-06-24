import { ImageProps } from 'next/image';

import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
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
const PostHeader: React.FC<Props> = ({
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
        <CoverImage
          absolute={false}
          objectFit={featuredImageSettings.imageFit as ImageProps['objectFit']}
          backgroundColor={featuredImageSettings.backgroundColor}
          title={title}
          coverImage={coverImage}
          priority={true}
          sizes={{ width: 1600, height: 1200 }}
        />
      </motion.div>
      <header className={styles['title-wrap']}>
        <motion.h3 layoutId={`title-${slug}`} className={styles['title']}>
          {title}
        </motion.h3>
        {/* <div className={styles['header-meta']}>
          <Date dateString={date} />
          <span className={styles['author-meta']}>
            {author.firstName} {author.lastName}
          </span>
        </div> */}
      </header>
    </div>
  );
};
export default PostHeader;

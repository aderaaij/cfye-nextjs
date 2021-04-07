import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
import styles from './PostHeader.module.scss';

import {
  MediaItem,
  PostToCategoryConnection,
  Post_Featuredimagesettings,
  User,
} from 'types';
import { limitText } from 'utils/limitCharacters';
interface Props {
  title: string;
  coverImage?: MediaItem;
  date: string;
  author?: User;
  categories?: PostToCategoryConnection;
  isEven?: boolean;
  featuredImageSettings?: Post_Featuredimagesettings;
}
const PostHeader: React.FC<Props> = ({
  title,
  coverImage,
  date,
  featuredImageSettings,
}) => {
  return (
    <div className={styles['post-header']}>
      <div className={styles['image-wrap']}>
        <CoverImage
          absolute={false}
          objectFit={featuredImageSettings.imageFit}
          backgroundColor={featuredImageSettings.backgroundColor}
          title={title}
          coverImage={coverImage}
          priority={true}
        />
      </div>
      <div className={styles['title-wrap']}>
        <h1 className={styles['title']}>{limitText(title, 50)}</h1>
        <Date dateString={date} />
      </div>
    </div>
  );
};
export default PostHeader;

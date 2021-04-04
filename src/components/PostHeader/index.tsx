import Avatar from '@/components/Avatar';
import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
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
  author,
  featuredImageSettings,
  isEven = false,
}) => {
  return (
    <>
      <section>
        <div>
          <CoverImage
            absolute={false}
            objectFit={featuredImageSettings.imageFit}
            backgroundColor={featuredImageSettings.backgroundColor}
            title={title}
            coverImage={coverImage}
          />
        </div>
        <div>
          <div>
            <h1>{limitText(title, 50)}</h1>
            <div>
              <Date dateString={date} />
            </div>

            <div>
              {/* <div
              
                dangerouslySetInnerHTML={{ __html: excerpt }}
              /> */}
              <Avatar isEven={isEven} author={author} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PostHeader;

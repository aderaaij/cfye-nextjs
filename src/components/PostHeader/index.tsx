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
import cn from 'classnames';
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
      <section
        className={cn(
          'w-screen',
          'w-full',
          'lg:h-screen',
          'relative',
          'overflow-hidden',
          'px-4 lg:px-0',
          'mb-12 lg:mb-16',
          'py-4 lg:py-0',
          'lg:grid',
          'lg:grid-cols-2',
          'grid-flow-col-dense',
          'snap-start'
        )}
      >
        <div
          className={cn(
            'relative h-full w-full max-w-full max-h-full flex-shrink-0  col-span-1',
            {
              'col-start-1 col-end-2': isEven,
              'col-start-2 col-span-3': !isEven,
            }
          )}
        >
          <CoverImage
            absolute={false}
            objectFit={featuredImageSettings.imageFit}
            backgroundColor={featuredImageSettings.backgroundColor}
            title={title}
            coverImage={coverImage}
          />
        </div>
        <div
          className={cn(
            'w-full',
            'h-full',
            'flex',
            'items-center',
            'flex-shrink',
            'lg:p-16',
            {
              'lg:text-right lg:justify-end col-start-1 col-end-2': !isEven,
              'col-start-2 col-end-3': isEven,
            }
          )}
        >
          <div
            className={cn('py-4 lg:py-0 flex flex-col ', {
              'items-end': !isEven,
            })}
          >
            <h1 className="mb-4 text-4xl text-cfye lg:text-7xl leading-tight font-header font-medium">
              {limitText(title, 50)}
            </h1>
            <div className="mb-4 lg:mb-8 text-base font-header font-light text-gray-600">
              <Date dateString={date} />
            </div>

            <div>
              {/* <div
                className="text-xl leading-relaxed mb-4 font-body font-light mb-8 max-w-paragraph"
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

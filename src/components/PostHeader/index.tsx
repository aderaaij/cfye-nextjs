import Avatar from '@/components/Avatar';
import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
import PostTitle from '@/components/PostTitle';
import Categories from '@/components/Categories';
import { MediaItem, PostToCategoryConnection, User } from 'types';

interface Props {
  title: string;
  coverImage?: MediaItem;
  date: string;
  author?: User;
  categories?: PostToCategoryConnection;
}
const PostHeader: React.FC<Props> = ({
  title,
  coverImage,
  date,
  author,
  categories,
}) => {
  return (
    <>
      {coverImage && (
        <div className="flex items-center justify-center sm:mx-0 p-4 lg:p-16 h-screen relative">
          <CoverImage title={title} cover={true} coverImage={coverImage} />
        </div>
      )}
      <header className="text-center flex flex-col items-center lg:px-16">
        <PostTitle>{title}</PostTitle>
        {/* {author && (
          <div className="hidden md:block md:mb-12">
            <Avatar author={author} />
          </div>
        )} */}
      </header>
      <div className="max-w-2xl mx-auto px-4">
        {author && (
          <div className="block md:hidden mb-6">
            <Avatar author={author} />
          </div>
        )}
        <div className="mb-6 font-header text-sm font-light px-4 text-gray-600">
          Posted <Date dateString={date} />
          {categories && <Categories categories={categories} />}
        </div>
      </div>
    </>
  );
};
export default PostHeader;

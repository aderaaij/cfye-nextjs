import Link from 'next/link';
import Avatar from '@/components/Avatar';
import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
import Image from 'next/image';

import {
  MediaItem,
  NodeWithAuthorToUserConnectionEdge,
  Post_Featuredimagesettings,
} from 'types';
import cn from 'classnames';
import { limitText } from 'utils/limitCharacters';
interface Props {
  title: string;
  coverImage: MediaItem;
  date: string;
  excerpt: string;
  author: NodeWithAuthorToUserConnectionEdge['node'];
  slug: string;
  isEven?: boolean;
  imageSettings?: Post_Featuredimagesettings;
}

const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  isEven,
  imageSettings,
}) => {
  return (
    <section
      className={cn(
        'w-full lg:h-screen overflow-hidden relative snap-start',
        'px-4 lg:px-0 mb-12 lg:mb-0 py-4 lg:py-0',
        'lg:grid  lg:grid-cols-2 w-6/12  bg-opacity-50 grid-flow-col-dense',
        {
          'bg-grey-200': !isEven,
        }
      )}
    >
      <div
        className={cn(
          'relative h-full w-full max-w-full max-h-full flex-shrink-0 lg:py-16 col-span-1',
          {
            'lg:pr-16 col-start-2 col-span-3': !isEven,
            'lg:pl-16 col-start-1 col-end-2': isEven,
          }
        )}
      >
        <CoverImage
          absolute={true}
          objectFit={imageSettings.imageFit}
          backgroundColor={imageSettings.backgroundColor}
          cover={true}
          title={title}
          coverImage={coverImage}
          slug={slug}
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
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight font-header font-medium">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline text-cfye">
                {limitText(title, 50)}
              </a>
            </Link>
          </h3>
          <div className="mb-4 lg:mb-8 text-sm font-header font-light text-gray-600">
            <Date dateString={date} />
          </div>
          <div
            className="text-xl leading-relaxed font-body font-light mb-8 max-w-paragraph"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar isEven={isEven} author={author} />
        </div>
      </div>
    </section>
  );
};
export default HeroPost;

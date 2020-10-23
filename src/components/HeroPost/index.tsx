import Link from 'next/link';
import Avatar from '@/components/Avatar';
import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
import { MediaItem, NodeWithAuthorToUserConnectionEdge } from 'types';
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
}

const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  isEven,
}) => {
  return (
    <section
      className={cn(
        'w-screen',
        'w-full',
        'lg:h-screen',
        'relative',
        'px-4 lg:px-0',
        'mb-12 lg:mb-0',
        'py-4 lg:py-0',
        'lg:grid',
        'lg:grid-cols-2',
        'grid-flow-col-dense',
        'snap-start',
        {
          'bg-gray-100': !isEven,
        }
      )}
    >
      <div
        className={cn(
          'relative h-full w-full max-w-full max-h-full flex-shrink-0 lg:py-16 col-span-1',
          {
            'lg:pr-16': !isEven,
            'lg:pl-16': isEven,
            'col-start-1 col-end-2': isEven,
            'col-start-2 col-span-3': !isEven,
          }
        )}
      >
        <CoverImage
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
              <a className="hover:underline text-cfye">{limitText(title)}</a>
            </Link>
          </h3>
          <div className="mb-4 lg:mb-8 text-sm font-header font-light text-gray-600">
            <Date dateString={date} />
          </div>

          <div>
            <div
              className="text-xl leading-relaxed mb-4 font-body font-light mb-8 max-w-paragraph"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <Avatar isEven={isEven} author={author} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroPost;

import cn from 'classnames';
import Link from 'next/link';
import { MediaItem } from 'types';

interface Props {
  title: string;
  coverImage: MediaItem;
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  slug,
  cover = false,
  absolute,
}) => {
  const image = (
    <img
      srcSet={coverImage?.srcSet}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
        absolute: absolute,
        'object-cover w-full h-full': cover,
      })}
    />
  );
  return (
    <>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="w-full h-full block relative" aria-label={title}>
            {image}
          </a>
        </Link>
      ) : (
        image
      )}
    </>
  );
};
export default CoverImage;

import cn from 'classnames';
import Link from 'next/link';
import { MediaItem } from 'types';

interface Props {
  title: string;
  coverImage: MediaItem;
  slug?: string;
  cover?: boolean;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  slug,
  cover = false,
}) => {
  const image = (
    <img
      src={coverImage?.sourceUrl}
      className={
        (cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        }),
        cover ? 'object-cover w-full h-full' : '')
      }
    />
  );
  return (
    <>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="w-full h-full block" aria-label={title}>
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

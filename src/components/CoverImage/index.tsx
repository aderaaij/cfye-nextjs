import cn from 'classnames';
import Link from 'next/link';
import { MediaItem } from 'types';

interface Props {
  title: string;
  coverImage: MediaItem;
  slug?: string;
  cover?: boolean;
  absolute?: boolean;
  objectFit?: string;
  backgroundColor?: string;
}

const CoverImage: React.FC<Props> = ({
  title,
  coverImage,
  slug,
  absolute,
  objectFit = 'contain',
  backgroundColor: bg,
}) => {
  console.log({ objectFit });
  const image = (
    <img
      srcSet={coverImage?.srcSet}
      className={cn(`w-full h-full shadow-small object-${objectFit}`, {
        'hover:shadow-medium transition-shadow duration-200': slug,
        absolute: absolute,
      })}
    />
  );
  return (
    <div
      style={{
        backgroundColor: bg ? bg : 'transparent',
      }}
      className="bg-gray-300 w-full h-full"
    >
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="w-full h-full block relative" aria-label={title}>
            {image}
          </a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};
export default CoverImage;

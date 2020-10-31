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
  const image = (
    <img
      srcSet={coverImage?.srcSet}
      className={cn(`w-full h-full  object-${objectFit}`, {
        'transition-shadow duration-200': slug,
        absolute: absolute,
      })}
    />
  );
  return (
    <div
      style={{
        backgroundColor: bg ? bg : 'transparent',
      }}
      className="w-full h-full"
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

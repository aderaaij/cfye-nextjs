import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
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
    <Image
      className={`coverImage object-${objectFit} w-full h-full`}
      src={coverImage.sourceUrl}
      alt="Picture of the author"
      layout="fill"
      quality={90}
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
        <Link as={`/${slug}`} href="/[slug]">
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

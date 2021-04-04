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
      src={coverImage.sourceUrl}
      alt="Picture of the author"
      layout="fill"
      quality={90}
    />
  );
  return (
    <div className="cover-image">
      {slug ? (
        <Link as={`/${slug}`} href="/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};
export default CoverImage;

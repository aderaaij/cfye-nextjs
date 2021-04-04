import Link from 'next/link';
import CoverImage from '@/components/CoverImage';

import {
  MediaItem,
  NodeWithAuthorToUserConnectionEdge,
  Post_Featuredimagesettings,
} from 'types';
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
  excerpt,
  slug,
  isEven,
  imageSettings,
}) => {
  return (
    <section>
      <div>
        <Link as={`/${slug}`} href="/[slug]">
          <a aria-label={title}>
            <CoverImage
              absolute={true}
              objectFit={imageSettings.imageFit}
              backgroundColor={imageSettings.backgroundColor}
              cover={true}
              title={title}
              coverImage={coverImage}
            />
          </a>
        </Link>
      </div>

      <div>
        <Link as={`/${slug}`} href="/[slug]">
          <a>
            <h3>{limitText(title, 60)}</h3>

            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
          </a>
        </Link>
      </div>
    </section>
  );
};
export default HeroPost;

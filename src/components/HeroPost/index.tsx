import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import CoverImage from '@/components/CoverImage';
import useHover from '@/hooks/useHover';
// import styles from './hero-post.module.css';

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
const borderVariants: Variants = {
  enter: {
    scale: 1,
    transition: {
      easings: 'anticipate',
      duration: 0.4,
    },
  },
  exit: {
    scale: 1.5,
    transition: {
      easings: 'anticipate',
      duration: 0.5,
    },
  },
  hoverIn: {
    scale: 1.02,
    transition: {
      ease: 'backOut',
      duration: 0.4,
    },
  },
};
const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  excerpt,
  slug,
  isEven,
  imageSettings,
}) => {
  const [hoverRef, isHovered] = useHover();
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
        <div ref={hoverRef}>
          <Link as={`/${slug}`} href="/[slug]">
            <a>
              <h3>{limitText(title, 60)}</h3>

              <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default HeroPost;

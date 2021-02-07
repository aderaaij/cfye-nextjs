import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import CoverImage from '@/components/CoverImage';
import useHover from '@/hooks/useHover';
import styles from './hero-post.module.css';

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
    <section
      className={cn(
        styles['hero-post'],
        'hero-post w-full lg:h-screen overflow-hidden relative snap-start',
        'px-4 lg:px-0 mb-12 lg:mb-0 py-4 lg:py-0',
        'lg:grid  lg:grid-cols-2 w-6/12  bg-opacity-50 grid-flow-col-dense'
      )}
    >
      <div
        className={cn(
          `${styles['image-wrap']}`,
          'block relative h-full w-full max-w-full max-h-full flex-shrink-0 col-span-1 overflow-hidden',
          {
            'col-start-2 col-span-3': isEven,
            'col-start-1 col-end-2': !isEven,
          }
        )}
      >
        <Link as={`/${slug}`} href="/[slug]">
          <a className="w-full h-full block relative" aria-label={title}>
            <motion.div
              variants={borderVariants}
              initial="hoverIn"
              exit="exit"
              animate={isHovered ? 'hoverIn' : 'enter'}
              className={cn(
                `${styles['image-border']}`,
                'w-full h-full overflow-hidden absolute top-0 left-0 z-10',
                {
                  [`${styles['image-shadow']}`]: !isHovered,
                }
              )}
            />
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

      <div
        className={cn(
          'w-full h-full',
          'flex items-center flex-shrink',
          'lg:p-16',
          {
            'lg:text-right lg:justify-end col-start-1 col-end-2': isEven,
            'col-start-2 col-end-3': !isEven,
          }
        )}
      >
        <div
          ref={hoverRef}
          className={cn(
            `${styles['text-wrap']}`,
            'py-4 lg:py-0 flex flex-col ',
            {
              'items-end': isEven,
            }
          )}
        >
          <Link as={`/${slug}`} href="/[slug]">
            <a>
              <h3
                className={`${styles['title']} mb-4 text-cfye text-4xl lg:text-6xl leading-tight font-header font-medium pointer-events-none`}
              >
                {limitText(title, 60)}
              </h3>

              <div
                className="text-xl ml-auto leading-relaxed font-body font-light mb-8 max-w-paragraph"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default HeroPost;

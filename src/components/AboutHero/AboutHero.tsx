import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cx from 'classnames';
import { AboutPageQuery } from 'types';
import { limitText } from 'utils/limitCharacters';
import styles from './AboutHero.module.scss';

interface Props {
  page: AboutPageQuery['page'];
  isEven?: boolean;
  type?: 'hero' | 'small';
}

export const AboutHero: React.FC<Props> = ({ page, isEven, type = 'hero' }) => {
  const { title, featuredImage } = page;

  return (
    <article
      className={cx(styles['featured-post'], {
        [styles['hero-post--is-even']]: isEven,
      })}
    >
      {page.featuredImage && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className={styles['image-wrap']}
        >
          <div className={cx({ [styles['image-link']]: type === 'hero' })}>
            <Image
              className={styles['image']}
              placeholder="blur"
              blurDataURL={featuredImage.node.thumbnail}
              src={featuredImage.node.sourceUrl}
              quality={90}
              priority={true}
              objectFit="cover"
              layout={'fill'}
              alt={title}
            />
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        className={styles['content-wrap']}
      >
        <div className={styles['meta-top']}></div>

        <div className={styles['content']}>
          <div className={styles['author-wrap']}></div>
          <h3
            className={cx(styles['title'], {
              [styles['title--small']]: type === 'small',
            })}
          >
            {limitText(title, 60)}
          </h3>

          <div className={styles['text-wrap']}>{parse(page.content)}</div>
        </div>

        <div className={styles['meta-bottom']}></div>
      </motion.div>
    </article>
  );
};

import parse from 'html-react-parser';
import Image from 'next/image';
import cx from 'classnames';
import { RootQueryToPostConnection } from 'types';
import ExcerptOverlay from '@/components/ExcerptOverlay';
import TagList from '@/components/TagList';
import styles from './Excerpts.module.scss';
import { limitText } from 'utils/limitCharacters';

interface Props {
  title?: string;
  edges: RootQueryToPostConnection['edges'];
  isEven?: boolean;
}

const Excerpts: React.FC<Props> = ({ title, edges, isEven = false }) => {
  const chunkSize = 3;
  const groups = edges
    .map((e, i) => {
      return i % chunkSize === 0 ? edges.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });
  return (
    <>
      {title && <h2 className={styles['title']}>{title}</h2>}
      <div
        className={cx(styles['wrap'], {
          [styles['wrap--is-even']]: isEven,
        })}
      >
        {groups[0].map(({ node }) => (
          <div className={styles['article']} key={node.id}>
            <ExcerptOverlay node={node} />
          </div>
        ))}
        <div className={styles['more']}>
          {groups[1].map(({ node }) => (
            <div className={styles['more-article']} key={node.id}>
              <Image
                placeholder="blur"
                blurDataURL={node.featuredImage.node.thumbnail}
                className={styles['more-image']}
                src={node.featuredImage.node.sourceUrl}
                width={400}
                height={400}
                objectFit="cover"
              />

              <div className={styles['more-content-wrap']}>
                <TagList tags={node.tags} context="articleExcerpt" />
                <h3 className={styles['more-article-title']}>{node.title}</h3>
                {parse(limitText(node.excerpt, 120))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Excerpts;

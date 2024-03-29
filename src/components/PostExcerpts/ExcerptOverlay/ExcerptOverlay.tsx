import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { PostExcerptFieldsFragment } from 'types';
import { TagList } from '@/components/Shared';
import styles from './ExcerptOverlay.module.scss';
import { limitText } from 'utils/limitCharacters';

interface Dimensions {
  width: number;
  height: number;
}

interface Props {
  node: PostExcerptFieldsFragment['node'];
  dimensions?: Dimensions;
}

export const ExcerptOverlay: React.FC<Props> = ({ node }) => {
  return (
    <article className={styles['article']}>
      <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
        <a className={styles['image-link']}>
          <Image
            // placeholder="blur"
            // blurDataURL={node.featuredImage.node.thumbnail}
            alt=""
            src={node.featuredImage.node.sourceUrl}
            layout="fill"
            objectFit="cover"
          />
        </a>
      </Link>
      <div className={styles['content']}>
        <TagList tags={node.tags} context="articleExcerpt" />
        <h3 className={styles['title']}>
          <Link as={`/posts/${node.slug}`} href="/posts/[slug]">
            <a>{node.title}</a>
          </Link>
        </h3>
        <div>{parse(limitText(node.excerpt, 120))}</div>
      </div>
    </article>
  );
};

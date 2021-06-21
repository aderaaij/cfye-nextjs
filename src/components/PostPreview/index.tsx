import Link from 'next/link';
import Avatar from '@/components/Avatar';
import Date from '@/components/Date';
import CoverImage from '@/components/CoverImage';
import { FeaturedImageFieldsFragment, User } from 'types';

interface Props {
  title: string;
  coverImage: FeaturedImageFieldsFragment['node'];
  date: string;
  excerpt: string;
  author: User;
  slug: string;
}

const PostPreview: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => {
  return (
    <div>
      <div>
        <CoverImage title={title} coverImage={coverImage} slug={slug} />
      </div>
      <h3>
        <Link as={`/${slug}`} href="/[slug]">
          <a dangerouslySetInnerHTML={{ __html: title }}></a>
        </Link>
      </h3>
      <div>
        <Date dateString={date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Avatar author={author} />
    </div>
  );
};
export default PostPreview;

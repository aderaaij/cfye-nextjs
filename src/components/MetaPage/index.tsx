import Head from 'next/head';
import { stripHtml } from 'string-strip-html';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  description: string;
  image?: string;
}
const MetaPage: React.FC<Props> = ({ title, description, image }) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title} | CFYE.com</title>
      {router && (
        <meta
          property="og:url"
          key="url"
          content={`https://cfye.com${router.asPath}`}
        />
      )}
      <meta property="og:title" key="title" content={title} />
      {description && (
        <meta
          property="og:description"
          key="description"
          content={stripHtml(description).result}
        />
      )}
      <meta
        property="og:image"
        key="image"
        content={image ? image : '/images/cfye_logo.png'}
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@cfye_crew" />
      <meta name="twitter:title" content={`${title} | CFYE.com`} />
      {description && (
        <meta
          name="twitter:description"
          content={stripHtml(description).result}
        />
      )}
      {image && (
        <meta
          name="twitter:image"
          content={image ? image : 'images/cfye_logo.png'}
        />
      )}
    </Head>
  );
};
export default MetaPage;

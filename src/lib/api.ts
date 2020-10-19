import { previewPost } from '@/graphql/queries/previewPost';
import { Post, PostFormatIdType } from 'types';

const API_URL = process.env.WORDPRESS_API_URL;

interface Variables {
  id?: string;
  idType?: PostFormatIdType;
  onlyEnabled?: boolean;
  preview?: boolean;
}

interface FetchOptions {
  variables?: Variables;
}

async function fetchAPI(
  query: string,
  { variables }: FetchOptions = {}
): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  if (!API_URL) throw new Error('API_URL undefined');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getPreviewPost(
  id: string,
  idType = PostFormatIdType.DatabaseId
): Promise<Post> {
  const data = await fetchAPI(previewPost, {
    variables: { id, idType },
  });
  return data.post;
}

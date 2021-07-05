import { NextRouter } from 'next/router';

export const returnSlugString = (router: NextRouter): string => {
  return Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug;
};

export const returnPageString = (router: NextRouter): string => {
  return Array.isArray(router.query.page)
    ? router.query.page[0]
    : router.query.page;
};

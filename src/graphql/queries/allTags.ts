import { gql } from '@apollo/client';
import { TaxonomyFields } from '../fragments/TaxonomyFields';
export const ALL_TAGS = gql`
  ${TaxonomyFields}
  {
    tags(where: { hideEmpty: true }, first: 10000) {
      ...TaxonomyFields
    }
  }
`;

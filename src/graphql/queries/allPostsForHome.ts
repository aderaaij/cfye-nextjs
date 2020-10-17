export const allPostsForHome = /* GraphQL */ `
  query AllPosts {
    posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              srcSet
              id
              mediaDetails {
                sizes {
                  sourceUrl
                }
              }
            }
          }
          author {
            node {
              name
              firstName
              lastName
              avatar {
                url
              }
            }
          }
        }
      }
    }
  }
`;

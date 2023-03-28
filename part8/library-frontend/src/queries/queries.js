import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query AllAuthors {
    results: allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    results: allBooks {
      id
      title
      author
      published
      genres
    }
  }
`;
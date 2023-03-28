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
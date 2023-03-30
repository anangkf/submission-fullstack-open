import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query AllAuthors {
    results: allAuthors {
      id
      name
      born
      books {
        id
        title
        published
        genres
      }
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    results: allBooks {
      id
      title
      author {
        id
        name
        born
      }
      published
      genres
    }
  }  
`;

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;
import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [Genres!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

export const SET_AUTHOR_BIRTH = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
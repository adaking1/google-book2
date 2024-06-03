import { gql } from '@apollo/client';

export const GET_ME = gql `
query Me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        title
        authors
        description
        bookId
        image
        link
      }
    }
  }
  `;
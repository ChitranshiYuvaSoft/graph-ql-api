import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const ALL_USERS = gql`
  query ExampleQuery($page: String!, $size: String!) {
    users(page: $page, size: $size) {
      totalRecords
      data {
        id
        name
        email
      }
    }
  }
`;

const authServices = {
  LOGIN_USER,
  ALL_USERS,

};

export default authServices;

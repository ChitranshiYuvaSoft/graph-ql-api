import { gql } from "@apollo/client";

const ME_DATA = gql`
query ExampleQuery {
  me {
    id
    name
    email
  }
}
`
const USER_DATA = gql`
query ExampleQuery($userId: String!) {
  user(id: $userId) {
    email
    id
    name
  }
}
`

const dataServices = {
    ME_DATA,
    USER_DATA
}

export default dataServices;
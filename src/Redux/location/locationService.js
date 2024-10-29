import { gql } from "@apollo/client";

const COUNTRIES_DATA = gql`
  query ExampleQuery {
    countries {
      id
      name
      phoneCode
      currency
      currencySymbol
      currencyName
    }
  }
`;

const STATES_DATA = gql`
  query ExampleQuery($statesId: ID!) {
    states(id: $statesId) {
      id
      name
    }
  }
`;


const CITIES_DATA = gql`
query ExampleQuery($citiesId: ID!) {
  cities(id: $citiesId) {
    id
    name
  }
}
`

const locationServices = {
  COUNTRIES_DATA,
  STATES_DATA,
  CITIES_DATA
};

export default locationServices;

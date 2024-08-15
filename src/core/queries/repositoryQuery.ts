import { graphql } from 'react-relay';

export default graphql`
  query repositoryQuery_nameQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
    }
  }
`;

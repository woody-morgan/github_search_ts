import { graphql } from 'react-relay';
import { OperationType } from 'relay-runtime';

export interface RepositoryEdge {
  node: {
    id: string;
    name: string;
    description: string;
    stargazerCount: number;
  };
  cursor: string;
}

export interface RepositoryOwnerQueryResponse {
  edges: Array<RepositoryEdge>;
}

export interface RepositoryOwnerQueryResponse extends OperationType {
  variables: {
    login: string;
    first: number;
  };
  response: {
    repositoryOwner: {
      id: string;
      login: string;
      repositories: RepositoryOwnerQueryResponse;
    };
  };
}

export default graphql`
  query repositoryOwnerQuery($login: String!, $first: Int!, $after: String) {
    repositoryOwner(login: $login) {
      id
      login
      repositories(first: $first, after: $after) {
        edges {
          node {
            id
            name
            description
            stargazerCount
          }
          cursor
        }
      }
    }
  }
`;

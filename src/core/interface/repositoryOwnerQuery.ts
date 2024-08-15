import { graphql, OperationType } from 'relay-runtime';

export interface RepositoryEdge {
  node: {
    id: string;
    name: string;
    description: string;
    stargazerCount: number;
    viewerHasStarred: boolean;
    url: string;
  };
  cursor: string;
}

export interface RepositoriesQueryResponse {
  edges: Array<RepositoryEdge>;
}

export interface RepositoryOwnerQueryResponse extends OperationType {
  variables: {
    login: string;
    first: number;
    after?: string;
  };
  response: {
    repositoryOwner: {
      id: string;
      login: string;
      repositories: RepositoriesQueryResponse;
    };
  };
}

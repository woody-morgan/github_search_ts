import { commitMutation, graphql } from 'relay-runtime';

const mutation = graphql`
  mutation addStarMutation($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

function addStar(environment, starrableId) {
  const variables = {
    input: {
      starrableId,
    },
  };

  return commitMutation(environment, {
    mutation,
    variables,
  });
}

export default addStar;

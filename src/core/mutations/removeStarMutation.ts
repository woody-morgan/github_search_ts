import { commitMutation, graphql } from 'relay-runtime';

const mutation = graphql`
  mutation removeStarMutation($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

function removeStar(environment, starrableId) {
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

export default removeStar;

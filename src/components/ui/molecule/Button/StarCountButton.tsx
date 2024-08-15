import React, { FunctionComponent, SyntheticEvent } from "react";
import { graphql, useMutation } from "react-relay";

import { Button, Icon } from "../../atom";

const AddStarCountMutation = graphql`
  mutation StarCountButton_addStar_Mutation($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;

const RemoveStarCountMutation = graphql`
  mutation StarCountButton_removeStar_Mutation($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;

type Props = {
  starrableId: string;
  stargazerCount: number;
  viewerHasStarred: boolean;
};

const StarCountButton: FunctionComponent<Props> = ({
  starrableId,
  stargazerCount,
  viewerHasStarred,
}) => {
  const [addStarMutate, isAddStarMutating] = useMutation(AddStarCountMutation);
  const [removeStarMutate, isRemoveStarMutating] = useMutation(RemoveStarCountMutation);

  const handleStarClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const variables = {
      input: {
        starrableId,
        clientMutationId: null,
      },
    };
    switch (viewerHasStarred) {
      case true:
        removeStarMutate({
          variables,
        });
        break;
      case false:
        addStarMutate({
          variables,
        });
        break;
    }
  };

  return (
    <Button
      className={viewerHasStarred ? "bg-primary-500" : "bg-gray-300"}
      disabled={isAddStarMutating || isRemoveStarMutating}
      roundness="counter"
      size="small"
      onClick={handleStarClick}
    >
      <span className="flex items-center space-x-2 pointer-events-none">
        <Icon className="text-yellow-400" name="star" />
        <p>{stargazerCount}</p>
      </span>
    </Button>
  );
};

export default StarCountButton;

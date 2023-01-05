import Link from "next/link";
import React, { FunctionComponent } from "react";
import { graphql, useFragment } from "react-relay";

import { Button, Icon } from "../../atom";
import type { RepositoryCard_Fragment$key } from "./__generated__/RepositoryCard_Fragment.graphql";

const RepositoryCardFragment = graphql`
  fragment RepositoryCard_Fragment on SearchResultItemEdge {
    node {
      ... on Repository {
        id
        name
        description
        stargazerCount
        viewerHasStarred
        url
      }
    }
  }
`;

const RepositoryInfo: FunctionComponent<{
  query: RepositoryCard_Fragment$key;
}> = ({ query }) => {
  const {
    node: { name, description, stargazerCount, viewerHasStarred, url },
  } = useFragment(RepositoryCardFragment, query);

  return (
    <Link className="block w-full py-2" target="_blank" rel="noopener noreferrer" href={url}>
      <div className="space-y-2">
        <p className="font-bold">{name}</p>
        <p>{description ?? name}</p>
        <Button
          className={viewerHasStarred ? "bg-primary-500" : "bg-gray-300"}
          roundness="counter"
          size="small"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="flex items-center space-x-2 pointer-events-none">
            <Icon className="text-yellow-400" name="star" />
            <p>{stargazerCount}</p>
          </span>
        </Button>
      </div>
    </Link>
  );
};

export default RepositoryInfo;

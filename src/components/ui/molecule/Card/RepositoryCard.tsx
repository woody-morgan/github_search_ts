import Link from "next/link";
import React, { FunctionComponent } from "react";
import { graphql, useFragment } from "react-relay";

import StarCountButton from "../Button/StarCountButton";
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
    node: { name, description, stargazerCount, viewerHasStarred, url, id },
  } = useFragment(RepositoryCardFragment, query);

  return (
    <Link className="block w-full py-2" target="_blank" rel="noopener noreferrer" href={url}>
      <div className="space-y-2">
        <p className="font-bold">{name}</p>
        <p>{description ?? name}</p>
        {id && (
          <StarCountButton
            starrableId={id}
            viewerHasStarred={viewerHasStarred}
            stargazerCount={stargazerCount}
          />
        )}
      </div>
    </Link>
  );
};

export default RepositoryInfo;

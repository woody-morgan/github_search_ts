import { FunctionComponent } from "react";
import { graphql, usePaginationFragment } from "react-relay";
import { OperationType } from "relay-runtime";

import { Button } from "../atom";
import { RepositoryCard } from ".";
import { RepositoriesView_Index_Fragment$key } from "./__generated__/RepositoriesView_Index_Fragment.graphql";

const ViewFragment = graphql`
  fragment RepositoriesView_Index_Fragment on Query
  @refetchable(queryName: "RepositoriesView_Index_Fragment_Query")
  @argumentDefinitions(first: { type: "Int!" }, after: { type: "String" }) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after)
      @connection(key: "Index_Fragment_search") {
      edges {
        ...RepositoryCard_Fragment
        cursor
      }
    }
  }
`;

const RepositoriesView: FunctionComponent<{
  query: RepositoriesView_Index_Fragment$key;
}> = ({ query }) => {
  const {
    data: {
      search: { edges },
    },
    loadNext,
    hasNext,
  } = usePaginationFragment<OperationType, RepositoriesView_Index_Fragment$key>(
    ViewFragment,
    query
  );

  const loadMore = () => {
    if (hasNext) {
      loadNext(5);
    }
  };

  return (
    <div className="w-full max-w-5xl divide-y-2">
      {edges.map((edge) => (
        <RepositoryCard key={edge.cursor} query={edge} />
      ))}
      {hasNext && (
        <Button roundness="counter" onClick={loadMore}>
          더보기
        </Button>
      )}
    </div>
  );
};

export default RepositoriesView;

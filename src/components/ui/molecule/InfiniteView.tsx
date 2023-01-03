import { Fragment, FunctionComponent } from 'react';
import { usePaginationFragment } from 'react-relay';
import { graphql } from 'react-relay';
import { OperationType } from 'relay-runtime';

import { Button } from '../atom';
import { RepositoryCard } from '.';
import { InfiniteView_Index_Fragment$key } from './__generated__/InfiniteView_Index_Fragment.graphql';

const ViewFragment = graphql`
  fragment InfiniteView_Index_Fragment on Query
  @refetchable(queryName: "InfiniteView_Index_Fragment_Query")
  @argumentDefinitions(first: { type: "Int!" }, after: { type: "String" }) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after)
      @connection(key: "Index_Fragment_search") {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
            viewerHasStarred
          }
        }
        cursor
      }
    }
  }
`;

const HomePage: FunctionComponent<{
  query: InfiniteView_Index_Fragment$key;
}> = ({ query }) => {
  const { data, loadNext, hasNext } = usePaginationFragment<
    OperationType,
    InfiniteView_Index_Fragment$key
  >(ViewFragment, query);

  const loadMore = () => {
    if (hasNext) {
      loadNext(5);
    }
  };

  const edges = data.search.edges?.filter((item) => {
    return item?.node !== null;
  });

  return (
    <Fragment>
      <ul>
        {edges.map((edge) => (
          <li key={edge?.cursor}>
            <RepositoryCard edge={edge} />
          </li>
        ))}
      </ul>
      <div className="py-2">
        <Button roundness="counter" onClick={loadMore}>
          더보기
        </Button>
      </div>
    </Fragment>
  );
};

export default HomePage;

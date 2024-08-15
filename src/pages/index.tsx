import { PageLayout } from '@src/components/layout';
import { Button } from '@src/components/ui/atom';
import { RepositoryInfo } from '@src/components/ui/molecule';
import { initEnvironment } from '@src/core/lib/relay';
import repositoryOwner, { RepositoryOwnerQueryResponse } from '@src/core/queries/repositoryOwner';
import { useState } from 'react';
import { fetchQuery } from 'react-relay';

const pagination = 5;

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps = await fetchQuery<RepositoryOwnerQueryResponse>(environment, repositoryOwner, {
    login: 'green-labs',
    first: pagination,
  });
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  };
}

interface HomePageProps {
  repositoryOwner: RepositoryOwnerQueryResponse['response']['repositoryOwner'];
}

function HomePage({ repositoryOwner }: HomePageProps) {
  const [repositories, setRepositories] =
    useState<RepositoryOwnerQueryResponse['response']['repositoryOwner']>(repositoryOwner);

  const { edges } = repositories.repositories;
  const lastCursor = edges[edges.length - 1].cursor;

  const handleLoadMore = async () => {
    // Todo: load more
    console.log('load more');
  };

  return (
    <PageLayout>
      <div className="w-full space-y-4 divide-y-2">
        {edges.length > 0 ? (
          edges.map((edge) => <RepositoryInfo key={edge.cursor} {...edge} />)
        ) : (
          <p className="text-center">No repositories found</p>
        )}
        <Button roundness="counter" onClick={handleLoadMore}>
          더보기
        </Button>
      </div>
    </PageLayout>
  );
}

export default HomePage;

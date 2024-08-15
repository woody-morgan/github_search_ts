import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import { Button } from '@src/components/ui/atom';
import { RepositoryInfo } from '@src/components/ui/molecule';
import siteMetadata from '@src/core/config/siteMetadata';
import { initEnvironment } from '@src/core/lib/relay';
import repositoryOwnerQuery, {
  RepositoryOwnerQueryResponse,
} from '@src/core/queries/repositoryOwnerQuery';
import { produce } from 'immer';
import { useRef, useState } from 'react';
import { fetchQuery } from 'react-relay';

const pagination = 5;

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps = await fetchQuery<RepositoryOwnerQueryResponse>(
    environment,
    repositoryOwnerQuery,
    {
      login: 'green-labs',
      first: pagination,
    }
  );
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
  const [repositoryInfo, setRepositoryInfo] =
    useState<RepositoryOwnerQueryResponse['response']['repositoryOwner']>(repositoryOwner);

  const { edges } = repositoryInfo.repositories;
  const lastCursor = useRef<string>(edges[edges.length - 1].cursor);

  const handleLoadMore = async () => {
    const environment = initEnvironment();
    const queryProps = await fetchQuery<RepositoryOwnerQueryResponse>(
      environment,
      repositoryOwnerQuery,
      {
        login: 'green-labs',
        first: pagination,
        after: lastCursor.current ?? null,
      }
    );
    const _newRepositoryInfo = { ...queryProps } as RepositoryOwnerQueryResponse['response'];

    // exception
    if (_newRepositoryInfo.repositoryOwner.repositories.edges.length === 0) return;

    lastCursor.current =
      _newRepositoryInfo.repositoryOwner.repositories.edges[
        _newRepositoryInfo.repositoryOwner.repositories.edges.length - 1
      ].cursor;

    setRepositoryInfo((prev) => ({
      ...prev,
      repositories: {
        ...produce(prev.repositories, (draft) => {
          draft.edges.push(..._newRepositoryInfo.repositoryOwner.repositories.edges);
        }),
      },
    }));
  };

  return (
    <PageLayout>
      <PageSEO title={siteMetadata.title} description={'Search Github Repositories'} />
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

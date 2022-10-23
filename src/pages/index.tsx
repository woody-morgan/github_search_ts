import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import { Button, InputBox } from '@src/components/ui/atom';
import { RepositoryInfo } from '@src/components/ui/molecule';
import siteMetadata from '@src/core/config/siteMetadata';
import { initEnvironment } from '@src/core/lib/relay';
import { addStar, removeStar } from '@src/core/mutations';
import repositoryOwnerQuery, {
  RepositoryOwnerQueryResponse,
} from '@src/core/queries/repositoryOwnerQuery';
import { ToastError } from '@src/utils/toastUtil';
import { produce } from 'immer';
import { Fragment, SyntheticEvent, useCallback, useRef, useState } from 'react';
import { fetchQuery } from 'react-relay';

const pagination = 5;
const defaultLogin = 'green-labs';

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps = await fetchQuery<RepositoryOwnerQueryResponse>(
    environment,
    repositoryOwnerQuery,
    {
      login: defaultLogin,
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
  const [searchText, setSearchText] = useState(defaultLogin);
  const [repoInfo, setRepoInfo] = useState<
    RepositoryOwnerQueryResponse['response']['repositoryOwner']
  >(() => repositoryOwner);
  const { edges } = repoInfo.repositories;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCursor = useRef<string>(edges.length > 0 ? edges[edges.length - 1].cursor : null);

  const fetchNextPage = useCallback(
    async (nextSearchText: string) => {
      const environment = initEnvironment();
      const queryProps = await fetchQuery<RepositoryOwnerQueryResponse>(
        environment,
        repositoryOwnerQuery,
        {
          login: nextSearchText,
          first: pagination,
          after: repoInfo.login === nextSearchText ? lastCursor.current : null,
        }
      );
      const _newRepo = { ...queryProps } as RepositoryOwnerQueryResponse['response'];
      // exception
      // NotFound
      if (!_newRepo.repositoryOwner) {
        lastCursor.current = null;
        setRepoInfo({ id: null, login: null, repositories: { edges: [] } });
        return;
      }
      // No data
      if (_newRepo.repositoryOwner.repositories.edges.length === 0) {
        // last page
        if (repoInfo.id === _newRepo.repositoryOwner.id) {
          ToastError('No more data');
        } else {
          // first search
          lastCursor.current = null;
          setRepoInfo(_newRepo.repositoryOwner);
        }
        return;
      }
      // Found but no data
      if (_newRepo.repositoryOwner.repositories.edges.length === 0) {
        lastCursor.current = null;
        setRepoInfo(_newRepo.repositoryOwner);
        return;
      }
      // set cursor
      lastCursor.current =
        _newRepo.repositoryOwner.repositories.edges[
          _newRepo.repositoryOwner.repositories.edges.length - 1
        ].cursor;
      // different user or nextSearchText is empty
      if (repoInfo.id !== _newRepo.repositoryOwner.id) {
        // set cursor
        setRepoInfo(_newRepo.repositoryOwner);
        return;
      } else {
        setRepoInfo(
          produce(repoInfo, (draft) => {
            draft.repositories.edges.push(..._newRepo.repositoryOwner.repositories.edges);
          })
        );
      }
    },
    [repoInfo]
  );

  const handleLoadMore = useCallback(async () => {
    await fetchNextPage(searchText);
  }, [fetchNextPage, searchText]);

  const handleSearchTextChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      setSearchText(value);

      // debounce
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(async () => {
        fetchNextPage(value);
      }, 500);
    },
    [fetchNextPage]
  );

  const handleStarClick = useCallback((nodeId: string, isStarred: boolean) => {
    const environment = initEnvironment();
    if (!isStarred) {
      addStar(environment, nodeId);
    } else {
      removeStar(environment, nodeId);
    }
    setRepoInfo((prev) => {
      return produce(prev, (draft) => {
        const target = draft.repositories.edges.find((edge) => edge.node.id === nodeId);
        target.node.viewerHasStarred = !target.node.viewerHasStarred;
        target.node.stargazerCount += target.node.viewerHasStarred ? 1 : -1;
      });
    });
  }, []);

  return (
    <PageLayout>
      <PageSEO title={siteMetadata.title} description={'Search Github Repositories'} />
      <div className="w-full divide-y-2">
        <div className="flex py-2 w-4/5 mx-auto">
          <InputBox
            type="id"
            name="searchText"
            placeholder={'Github Repo'}
            value={searchText}
            fullWidth
            onChange={handleSearchTextChange}
          />
        </div>
        {edges.length > 0 ? (
          <Fragment>
            {edges.map((edge) => (
              <RepositoryInfo key={edge.cursor} {...edge} onStarClick={handleStarClick} />
            ))}
            <div className="py-2">
              <Button roundness="counter" onClick={handleLoadMore}>
                더보기
              </Button>
            </div>
          </Fragment>
        ) : (
          <p className="text-center">No repositories found</p>
        )}
      </div>
    </PageLayout>
  );
}

export default HomePage;

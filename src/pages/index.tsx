import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import { HomePageTemplate } from '@src/components/template';
import siteMetadata from '@src/core/config/siteMetadata';
import { initEnvironment } from '@src/core/lib/relay';
import repositoryOwnerQuery, {
  RepositoryOwnerQueryResponse,
} from '@src/core/queries/repositoryOwnerQuery';
import { fetchQuery } from 'react-relay';

// defaults
const pagination = 5;
const defaultLogin = 'green-labs';

export async function getServerSideProps() {
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

export interface HomePageProps {
  repositoryOwner: RepositoryOwnerQueryResponse['response']['repositoryOwner'];
}

function HomePage({ repositoryOwner }: HomePageProps) {
  return (
    <PageLayout>
      <PageSEO title={siteMetadata.title} description={'Search Github Repositories'} />
      <HomePageTemplate
        repositoryOwner={repositoryOwner}
        defaultLogin={defaultLogin}
        pagination={pagination}
      />
    </PageLayout>
  );
}

export default HomePage;

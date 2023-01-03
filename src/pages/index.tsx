import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import { HomePageTemplate } from '@src/components/template';
import siteMetadata from '@src/core/config/siteMetadata';
import { initEnvironment } from '@src/core/lib/relay';

const HomePage = () => {
  return (
    <PageLayout>
      <PageSEO title={siteMetadata.title} description={'Search Github Repositories'} />
      <HomePageTemplate />
    </PageLayout>
  );
};

export async function getServerSideProps() {
  const environment = initEnvironment();
  const initialRecords = environment.getStore().getSource().toJSON();
  return {
    props: {
      initialRecords,
    },
  };
}

export default HomePage;

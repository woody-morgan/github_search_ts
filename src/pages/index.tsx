import { initEnvironment } from '@src/core/lib/relay';
import repositoryQuery from '@src/core/queries/repository';
import { fetchQuery } from 'react-relay';

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps = await fetchQuery(environment, repositoryQuery, {
    owner: 'woodi97',
    name: 'reactify',
  });
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  };
}

function HomePage(props) {
  return (
    <div>
      <header>{props.repository?.name}</header>
    </div>
  );
}

export default HomePage;

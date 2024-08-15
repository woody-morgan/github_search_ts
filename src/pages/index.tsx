import { PageSEO } from "@src/components/analytics/SEO";
import { PageLayout } from "@src/components/layout";
import { HomePageTemplate } from "@src/components/template";
import siteMetadata from "@src/core/config/siteMetadata";
import { GetServerSidePropsContext, NextPage } from "next";

interface Props {
  searchText: string | string[];
}

const HomePage: NextPage<Props> = ({ searchText }) => {
  return (
    <PageLayout>
      <PageSEO title={siteMetadata.title} description={"Search Github Repositories"} />
      <HomePageTemplate searchText={Array.isArray(searchText) ? "" : searchText} />
    </PageLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const searchText = ctx.query["search"] ?? "";
  return {
    props: {
      searchText,
    },
  };
}

export default HomePage;

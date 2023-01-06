import { PageSEO } from "@src/components/analytics/SEO";
import { PageLayout } from "@src/components/layout";
import { HomePageTemplate } from "@src/components/template";
import { Spinner } from "@src/components/ui/atom";
import siteMetadata from "@src/core/config/siteMetadata";
import { GetServerSidePropsContext, NextPage } from "next";
import { Suspense } from "react";

interface Props {
  searchText: string | string[];
}

const HomePage: NextPage<Props> = ({ searchText }) => {
  return (
    <PageLayout>
      <PageSEO title={siteMetadata.title} description={"Search Github Repositories"} />
      <Suspense
        fallback={
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner width={40} height={40} />
          </div>
        }
      >
        <HomePageTemplate searchText={Array.isArray(searchText) ? "" : searchText} />
      </Suspense>
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

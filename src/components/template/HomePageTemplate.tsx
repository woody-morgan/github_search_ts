import { Button, InputBox } from "@src/components/ui/atom";
import { defaultPagination } from "@src/utils/constants";
import { useRouter } from "next/router";
import { FunctionComponent, SyntheticEvent, useCallback } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { RepositoriesView } from "../ui/molecule";
import type { HomePageTemplate_Index_Query } from "./__generated__/HomePageTemplate_Index_Query.graphql";

const HomePageTemplateQuery = graphql`
  query HomePageTemplate_Index_Query($query: String!, $first: Int!, $after: String) {
    ...RepositoriesView_Index_Fragment @arguments(first: $first, after: $after)
  }
`;

const HomePageTemplate: FunctionComponent<{
  searchText: string;
}> = ({ searchText }) => {
  const router = useRouter();

  const query = useLazyLoadQuery<HomePageTemplate_Index_Query>(HomePageTemplateQuery, {
    query: searchText,
    first: defaultPagination,
  });

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.elements["search"]["value"];
    router.push(value ? `/?search=${value}` : "/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <InputBox type="id" name="search" placeholder="Github Repo" fullWidth />
        <Button type="submit">Search</Button>
      </div>
      <RepositoriesView query={query} />
    </form>
  );
};

export default HomePageTemplate;

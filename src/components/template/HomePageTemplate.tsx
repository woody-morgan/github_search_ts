import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import { InputBox } from '@src/components/ui/atom';
import siteMetadata from '@src/core/config/siteMetadata';
import { defaultPagination, defaultSearchText } from '@src/utils/constants';
import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { InfiniteView } from '../ui/molecule';
import type { HomePageTemplate_Index_Query } from './__generated__/HomePageTemplate_Index_Query.graphql';

const HomePageTemplateQuery = graphql`
  query HomePageTemplate_Index_Query($query: String!, $first: Int!, $after: String) {
    ...InfiniteView_Index_Fragment @arguments(first: $first, after: $after)
  }
`;

const HomePageTemplate = () => {
  const searchText = useMemo(() => defaultSearchText, []);

  const query = useLazyLoadQuery<HomePageTemplate_Index_Query>(HomePageTemplateQuery, {
    query: searchText,
    first: defaultPagination,
  });

  const [search, setSearch] = useState(searchText);

  const handleSearchTextChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setSearch(value);
  }, []);

  return (
    <div className="w-full divide-y-2">
      <div className="flex py-2">
        <InputBox
          type="id"
          name="searchText"
          placeholder={'Github Repo'}
          value={search}
          fullWidth
          onChange={handleSearchTextChange}
        />
      </div>
      <InfiniteView query={query} />
    </div>
  );
};

export default HomePageTemplate;

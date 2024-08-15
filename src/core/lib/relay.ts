import { useMemo } from 'react';
import type { Variables } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { envConfig } from '../config/envConfig';

async function fetchGraphQL(request, variables: Variables) {
  const response = await fetch(envConfig.API_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${envConfig.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });
  return await response.json();
}

function createEnvironment() {
  return new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
  });
}

let relayEnvironment;

export function initEnvironment() {
  const environment = relayEnvironment ?? createEnvironment();

  if (typeof window === 'undefined') return environment;

  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useEnvironment() {
  const store = useMemo(() => initEnvironment(), []);
  return store;
}

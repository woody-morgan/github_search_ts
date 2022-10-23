import { RepositoryEdge } from '@src/core/queries/repositoryOwnerQuery';
import React, { FunctionComponent } from 'react';

import { Button, Icon } from '../atom';

const RepositoryInfo: FunctionComponent<RepositoryEdge> = ({ node }) => {
  return (
    <div className="w-full">
      <div className="space-y-2">
        <p className="font-bold">{node.name}</p>
        <p>{node.description ?? node.name}</p>
        <Button className="px-2" roundness="counter" size="small">
          <span className="flex items-center space-x-1">
            <Icon className="text-yellow-400" name="star" />
            <p>{node.stargazerCount}</p>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default RepositoryInfo;

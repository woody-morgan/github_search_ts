import React from 'react';

import { Button, Icon } from '../atom';

const RepositoryInfo = ({ edge }) => {
  const { id, name, description, stargazerCount, viewerHasStarred } = edge.node;
  return (
    <div className="space-y-2">
      <p className="font-bold">{name}</p>
      <p>{description ?? name}</p>
      <Button
        className={viewerHasStarred ? 'bg-primary-500' : 'bg-gray-300'}
        roundness="counter"
        size="small"
      >
        <span className="flex items-center space-x-2 pointer-events-none">
          <Icon className="text-yellow-400" name="star" />
          <p>{stargazerCount}</p>
        </span>
      </Button>
    </div>
  );
};

export default RepositoryInfo;

import { RepositoryEdge } from '@src/core/queries/repositoryOwnerQuery';
import cx from 'classnames';
import React, { FunctionComponent } from 'react';

import { Button, Icon } from '../atom';

interface RepositoryInfoProps extends RepositoryEdge {
  onStarClick: (id: string, isStarred: boolean) => void;
}

const RepositoryInfo: FunctionComponent<RepositoryInfoProps> = ({ node, onStarClick }) => {
  const { id, name, description, stargazerCount, viewerHasStarred } = node;
  return (
    <div className="w-full py-2">
      <div className="space-y-2">
        <p className="font-bold">{name}</p>
        <p>{description ?? name}</p>
        <Button
          className={cx('px-4', viewerHasStarred ? 'bg-yellow-200' : 'bg-gray-100')}
          roundness="counter"
          size="small"
          onClick={() => {
            onStarClick(id, viewerHasStarred);
          }}
        >
          <span className="flex items-center space-x-2 pointer-events-none">
            <Icon className="text-yellow-400" name="star" />
            <p>{stargazerCount}</p>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default RepositoryInfo;

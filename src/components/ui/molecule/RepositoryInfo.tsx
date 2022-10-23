import { RepositoryEdge } from '@src/core/queries/repositoryOwnerQuery';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { Button, Icon } from '../atom';

interface RepositoryInfoProps extends RepositoryEdge {
  onStarClick: (id: string, isStarred: boolean) => void;
}

const RepositoryInfo: FunctionComponent<RepositoryInfoProps> = ({ node, onStarClick }) => {
  const { id, name, description, stargazerCount, viewerHasStarred, url } = node;
  return (
    <Link href={url}>
      <a className="block w-full py-2 cursor-pointer" target="_blank" rel="noopener noreferrer">
        <div className="space-y-2">
          <p className="font-bold">{name}</p>
          <p>{description ?? name}</p>
          <Button
            className={viewerHasStarred ? 'bg-primary-500' : 'bg-gray-300'}
            roundness="counter"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onStarClick(id, viewerHasStarred);
            }}
          >
            <span className="flex items-center space-x-2 pointer-events-none">
              <Icon className="text-yellow-400" name="star" />
              <p>{stargazerCount}</p>
            </span>
          </Button>
        </div>
      </a>
    </Link>
  );
};

export default RepositoryInfo;

import cx from 'classnames';
import React, { ButtonHTMLAttributes, FC } from 'react';

import Icon, { SVGTypes } from './Icon';

export type IconButtonProps = {
  name: SVGTypes;
  size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<IconButtonProps> = ({ className, name, size, ...props }) => {
  return (
    <button className={cx(className, 'flex justify-center items-center')} {...props}>
      <Icon name={name} size={size} />
    </button>
  );
};

export default IconButton;

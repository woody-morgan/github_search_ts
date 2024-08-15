import React, { FunctionComponent } from 'react';
import { AiFillStar } from 'react-icons/ai';

export type SVGTypes = 'star';

export type IconProps = {
  name: SVGTypes;
  size?: number;
  className?: string;
};

const _Selector: { [key in SVGTypes]: FunctionComponent<IconProps> } = {
  star: AiFillStar,
};

const Icon: FunctionComponent<IconProps> = ({ name, ...props }) => {
  const IconComponent = _Selector[name];
  return <IconComponent className="pointer-events-none" name={name} {...props} />;
};

export default Icon;

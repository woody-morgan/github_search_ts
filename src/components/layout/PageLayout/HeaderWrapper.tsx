import cx from 'classnames';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

type HeaderProps = {
  className?: string;
  fixed?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
};

const HeaderWrapper: ForwardRefRenderFunction<HTMLDivElement, HeaderProps> = (
  { className, fixed = false, transparent = false, children },
  ref
) => {
  return (
    <header className="relative">
      <div
        ref={ref}
        className={cx(
          className,
          'z-20 w-full max-w-mobile-app h-gb-header top-0',
          'px-side-padding py-2',
          'flex justify-between items-center align-middle',
          'font-bold',
          fixed ? 'fixed' : 'absolute',
          transparent ? 'bg-transparent' : 'bg-primary-bg',
          'border-b-2 border-gray-200'
        )}
      >
        {children}
      </div>
    </header>
  );
};

export default forwardRef(HeaderWrapper);

import useWindowResize from '@src/hooks/useWindowResize';
import cx from 'classnames';
import React, { FC, useRef } from 'react';

import CommonHeader from './CommonHeader';
import HeaderWrapper from './HeaderWrapper';

const PageLayout: FC<{
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  fixedHeight?: boolean;
  headerFixed?: boolean;
  headerTransparent?: boolean;
  overflowVisible?: boolean;
  headerContent?: React.ReactNode;
}> = ({
  children,
  className,
  fullWidth = false,
  fixedHeight = false,
  headerFixed = false,
  headerTransparent = false,
  overflowVisible = false,
  headerContent = <CommonHeader />,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  // to recalculate height when mobile browser search bar appeared and disappeared
  useWindowResize(() => {
    if (fixedHeight) {
      mainRef.current.style.setProperty('height', `${window.innerHeight}px`);
      document.body.style.overflow = 'hidden';
    } else {
      mainRef.current.style.setProperty('height', 'h-full');
      document.body.style.overflow = 'auto';
    }
  }, 100);

  return (
    <div
      className={cx(
        'relative w-full max-w-mobile-app m-center',
        overflowVisible ? 'overflow-visible' : 'overflow-hidden'
      )}
    >
      <HeaderWrapper fixed={headerFixed} transparent={headerTransparent}>
        {headerContent}
      </HeaderWrapper>
      <main
        ref={mainRef}
        className={cx(
          className,
          'relative m-center w-full pt-gb-header pb-bt-nav',
          fullWidth ? null : `max-w-mobile-app px-side-padding`,
          fixedHeight ? 'overflow-hidden h-screen' : 'min-h-screen'
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default PageLayout;

import { btnRounded, btnSizes, btnStyles } from '@src/utils/constants';
import cx from 'classnames';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  size?: btnSizes;
  styles?: btnStyles;
  roundness?: btnRounded;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const selectRounded: { [key in btnRounded]: string } = {
  primary: 'rounded-[2.5rem]',
  keyboard: 'rounded-none',
  counter: 'rounded-[0.5rem]',
};

const selectSize: { [keys in btnSizes]: string } = {
  large: 'px-16 h-16 text-lg',
  medium: 'px-10 h-12 text-base',
  small: 'px-8 h-8 text-sm',
  xsmall: 'px-6 h-6 text-xs',
  none: '',
};

const selectStyle: { [keys in btnStyles]: string } = {
  primary: 'bg-primary-500 hover:bg-primary-700 focus:bg-primary-900',
  secondary: 'bg-secondary-500 hover:bg-secondary-700 focus:bg-secondary-900',
  tertiary: 'bg-slate-100 hover:bg-slate-200 focus:bg-slate-200',
  link: 'bg-link-500 hover:bg-link-700 hover:text-link-400 focus:text-link-300',
  danger: 'bg-red-700 text-red-100 hover:bg-red-600 focus:bg-red-600',
  success: 'bg-green-700 text-green-100 hover:bg-green-600 focus:bg-green-600',
  warning: 'bg-orange-700 text-orange-100 hover:bg-orange-600 focus:bg-orange-600',
  transparent: 'bg-transparent text-black',
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    type = 'button',
    size = 'medium',
    styles = 'primary',
    roundness = 'primary',
    disabled = false,
    fullWidth = false,
    children,
    className,
    onClick,
  },
  ref
) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        className,
        selectSize[size],
        selectStyle[styles],
        selectRounded[roundness],
        'transition-colors bg-slate focus:shadow-outline duration-150',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        fullWidth ? 'w-full' : ''
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);

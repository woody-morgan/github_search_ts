import { inputBoxSizes } from '@src/utils/constants';
import cx from 'classnames';
import React, { ChangeEventHandler, FunctionComponent, memo } from 'react';

const sizeSelector: { [keys in inputBoxSizes] } = {
  xsmall: 'h-6 text-xs',
  small: 'h-12',
  medium: 'h-14',
  large: 'h-16',
};

const InputBox: FunctionComponent<{
  disabled?: boolean;
  type: 'id' | 'email' | 'password';
  name: string;
  label: string;
  value: string | number;
  size?: inputBoxSizes;
  placeholder?: string;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  classNames?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({
  disabled = false,
  name,
  label,
  size = 'medium',
  error,
  errorMessage = 'wrong input',
  fullWidth = false,
  classNames,
  ...props
}) => {
  return (
    <div className={fullWidth ? 'w-full' : 'w-[280px] md:w-[320px]'}>
      <div className="w-full h-full space-y-2">
        <label htmlFor={name}>
          <p className="text-xs font-bold md:text-base">{label}</p>
        </label>
        <input
          disabled={disabled}
          id={name}
          name={name}
          className={cx(
            'p-2 w-full h-full',
            sizeSelector[size],
            'border-2 rounded-xl',
            error ? 'border-red-400' : 'border-primary-600',
            'focus:outline-none',
            'disabled:bg-gray-500',
            classNames
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs md:text-sm text-red-400">{errorMessage}</p>}
    </div>
  );
};

export default memo(InputBox);

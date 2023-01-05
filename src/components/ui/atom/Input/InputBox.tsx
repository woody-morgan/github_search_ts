import { inputBoxSizes } from "@src/utils/constants";
import cx from "classnames";
import React, { ChangeEventHandler, FunctionComponent, memo } from "react";

const sizeSelector: { [keys in inputBoxSizes] } = {
  xsmall: "h-6 text-xs",
  small: "h-8 text-sm",
  medium: "h-12 text-base",
  large: "h-16 text-lg",
};

const widthSelector: { [keys in inputBoxSizes] } = {
  xsmall: "w-20",
  small: "w-40",
  medium: "w-60",
  large: "w-80",
};

const InputBox: FunctionComponent<{
  disabled?: boolean;
  type: "id" | "email" | "password";
  name: string;
  value?: string | number;
  size?: inputBoxSizes;
  placeholder?: string;
  readOnly?: boolean;
  fullWidth?: boolean;
  classNames?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ disabled = false, name, size = "medium", fullWidth = false, classNames, ...props }) => {
  return (
    <div
      className={cx(
        classNames,
        fullWidth ? "w-full" : widthSelector[size],
        sizeSelector[size],
        "border-2 rounded-xl",
        "overflow-hidden",
        "focus-within:border-blue-500"
      )}
    >
      <label htmlFor={name} />
      <input
        disabled={disabled}
        id={name}
        name={name}
        className={"p-2 w-full h-full no-border-outline"}
        {...props}
      />
    </div>
  );
};

export default memo(InputBox);

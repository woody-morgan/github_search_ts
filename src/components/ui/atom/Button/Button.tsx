import { btnRounded, btnSizes, btnStyles } from "@src/utils/constants";
import cx from "classnames";
import React, { forwardRef, ForwardRefRenderFunction, SyntheticEvent } from "react";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  size?: btnSizes;
  styles?: btnStyles;
  roundness?: btnRounded;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

const selectRounded: { [key in btnRounded]: string } = {
  primary: "rounded-xl",
  keyboard: "rounded-none",
  counter: "rounded-[0.5rem]",
};

const selectSize: { [keys in btnSizes]: string } = {
  large: "px-12 h-16 text-lg",
  medium: "px-8 h-12 text-base",
  small: "px-4 h-8 text-sm",
  xsmall: "px-2 h-6 text-xs",
  none: "",
};

const selectStyle: { [keys in btnStyles]: string } = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500 ",
  tertiary: "bg-slate-100",
  link: "bg-link-500",
  danger: "bg-red-700 text-red-100",
  success: "bg-green-700 text-green-100",
  warning: "bg-orange-700 text-orange-100",
  transparent: "bg-transparent text-black",
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    type = "button",
    size = "medium",
    styles = "primary",
    roundness = "primary",
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
        selectSize[size],
        selectStyle[styles],
        selectRounded[roundness],
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        fullWidth ? "w-full" : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);

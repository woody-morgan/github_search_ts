import classNames from "classnames";
import NextImage, { ImageProps } from "next/image";

type CustomImageType = {
  bgFilter?: string;
};

/**
 * @param {string} bgFilter - pass bgFilter to add filter to image(parent should be relative)
 * @example 'bg-gradient-to-r from-gray-500/10 to-gray-500/50'
 */
const Image = ({ bgFilter, className, ...rest }: ImageProps & CustomImageType) => (
  <div className="relative w-full h-full">
    <div
      className={
        bgFilter ? classNames(className, "absolute inset-0 w-full h-full z-[1]", bgFilter) : ""
      }
    />
    <NextImage className={className} {...rest} />
  </div>
);

export default Image;

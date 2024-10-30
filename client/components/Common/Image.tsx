import Image, { StaticImageData } from "next/image";
type ImageOwnProps<T extends React.ElementType> = {
  className: string;
  image: StaticImageData | string;
  alt: string;
  height?: number;
  width?: number;
  objectCover?: string;
  as?: T;
};

type ImageProps<T extends React.ElementType> = ImageOwnProps<T> &
  Omit<React.ComponentProps<T>, keyof ImageOwnProps<T>>;

export const Images = <T extends React.ElementType = "div">({
  className,
  image,
  alt,
  height,
  width,
  objectCover,
  as,
  ...rest
}: ImageProps<T>) => {
  const Component = as || "div";
  return (
    <Component className={className} {...rest}>
      <Image
        src={image}
        height={height}
        width={width}
        alt={alt}
        className={`w-full h-full ${objectCover}`}
      />
    </Component>
  );
};

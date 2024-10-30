import Image from "next/image";
import assets from "@/assets";
const ReuseAbleBanner = ({ name, path }: { name: string; path: string }) => {
  return (
    <div className="relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div>
        <Image
          src={assets.images.aboutBanner}
          alt="image"
          width={1920}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
      {/* Text in the center of the image */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white">
        <p className="text-3xl uppercase font-bold text-center">{name}</p>
        <p className="text-xl uppercase font-bold text-center">
          Home <span>/ {path}</span>
        </p>
      </div>
    </div>
  );
};
export default ReuseAbleBanner;

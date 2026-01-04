"use client";

import Image from "next/image";

interface AuthVisualProps {
  imageSrc: string;
  alt?: string;
}

const AuthVisual = ({
  imageSrc,
  alt = "Auth illustration",
}: AuthVisualProps) => {
  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden'>
      <Image
        src={imageSrc}
        alt={alt}
        width={836}
        height={836}
        priority
        className='max-h-full max-w-full object-contain'
      />
    </div>
  );
};

export default AuthVisual;

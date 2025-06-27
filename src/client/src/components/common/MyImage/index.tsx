'use client';
import { IMAGES } from '@/data/images';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface MyImageProps extends ImageProps {
    defaultSrc?: string;
}

export default function MyImage({ src, alt, className, defaultSrc,...props }: MyImageProps) {
   const [imageSrc, setImageSrc] = useState(() => {
    if(src !== ''){
        return src;
    }
    if(defaultSrc !== ''){
        return defaultSrc;
    }
    return IMAGES.DEFAULT_COURSE.src;
   });
   
   const handleError = () => {
    setImageSrc(defaultSrc ?? IMAGES.DEFAULT_COURSE.src);
   }
   
    return (
        <Image
            src={imageSrc ?? IMAGES.DEFAULT_COURSE.src}
            alt={alt}
            className={className}
            onError={handleError}
            {...props}
        />
    );
}
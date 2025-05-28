import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import { cx } from 'class-variance-authority';
import { ChevronRight, Search as SearchICon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function HeaderSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div
        className={cx(
          'flex items-center bg-background-2 dark:bg-background-1  p-2 h-11',
          isFocused ? 'border rounded-t-lg' : 'rounded-lg',
        )}
      >
        <SearchICon className="text-color-2" />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => {
            setIsFocused(true);
          }}
          className="ml-2 p-1 focus:outline-none w-100 placeholder:text-color-2 placeholder:text-sm"
        />
      </div>
      <div
        className={cx(
          'absolute top-[100%] left-0 w-full bg-background-1 shadow-lg rounded-b-lg p-2 border',
          isFocused ? 'block' : 'hidden',
        )}
      >
        <ScrollArea className="h-72 w-full rounded-md">
          <div className="flex flex-col gap-1">
            <div className="relative w-full text-start">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t text-color-2"></div>
              </div>
              <TextDescription className="relative font-medium bg-background-1 dark:bg-background-1 px-2 ml-2">
                Course
              </TextDescription>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
              <div className="w-10 h-10 bg-background-1 rounded-md">
                <Image
                  src={IMAGES.DEFAULT_COURSE}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <TextHeading className="text-md font-semibold text-color-1">
                  Course Name
                </TextHeading>
                <TextDescription>@Description</TextDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
              <div className="w-10 h-10 bg-background-1 rounded-md">
                <Image
                  src={IMAGES.DEFAULT_COURSE}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <TextHeading className="text-md font-semibold text-color-1">
                  Course Name
                </TextHeading>
                <TextDescription>@Description</TextDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
              <div className="w-10 h-10 bg-background-1 rounded-md">
                <Image
                  src={IMAGES.DEFAULT_COURSE}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <TextHeading className="text-md font-semibold text-color-1">
                  Course Name
                </TextHeading>
                <TextDescription>@Description</TextDescription>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative w-full text-start">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t text-color-2"></div>
              </div>
              <TextDescription className="relative font-medium bg-background-1 dark:bg-background-1 px-2 ml-2">
                Posts
              </TextDescription>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
              <div className="w-10 h-10 bg-background-1 rounded-md">
                <Image
                  src={IMAGES.DEFAULT_COURSE}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <TextHeading className="text-md font-semibold text-color-1">
                  Course Name
                </TextHeading>
                <TextDescription>@Description</TextDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
              <div className="w-10 h-10 bg-background-1 rounded-md">
                <Image
                  src={IMAGES.DEFAULT_COURSE}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <TextHeading className="text-md font-semibold text-color-1">
                  Course Name
                </TextHeading>
                <TextDescription>@Description</TextDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
              <div className="w-10 h-10 bg-background-1 rounded-md">
                <Image
                  src={IMAGES.DEFAULT_COURSE}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <TextHeading className="text-md font-semibold text-color-1">
                  Course Name
                </TextHeading>
                <TextDescription>@Description</TextDescription>
              </div>
            </div>
          </div>
          <Button
            variant="text"
            className="w-full mt-2 justify-start"
            onClick={() => {
              router.push(paths.SEARCH);
              setIsFocused(false);
            }}
          >
            <TextHeading className="text-md text-left font-semibold text-color-1">
              Xem tất cả
            </TextHeading>
            <ChevronRight />
          </Button>
        </ScrollArea>
      </div>
    </div>
  );
}

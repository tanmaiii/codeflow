'use client';

import { SVGS } from '@/data/images';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { setCurrentLocale } from '@/lib/utils';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    router.push(`/${newLocale}${pathname?.replace(/^\/(en|vi|ja)/, '')}`);
  };

  useEffect(() => {
    setCurrentLocale(currentLocale);
  }, [currentLocale]);

  const localeOptions = [
    {
      value: 'vi',
      label: 'Tiếng Việt',
      flag: SVGS.VI,
      alt: 'Vietnamese'
    },
    {
      value: 'en', 
      label: 'English',
      flag: SVGS.EN,
      alt: 'English'
    },
    {
      value: 'ja',
      label: '日本語',
      flag: SVGS.JA,
      alt: 'Japanese'
    }
  ];

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-fit h-9 px-3 gap-2 border-none bg-background-2 shadow-none hover:bg-accent">
        <SelectValue>
          <div className="flex items-center gap-2">
            <Image 
              src={localeOptions.find(option => option.value === currentLocale)?.flag} 
              className="w-4 h-4" 
              width={16} 
              height={16} 
              alt={localeOptions.find(option => option.value === currentLocale)?.alt ?? ''} 
            />
            <span className="text-sm">
              {localeOptions.find(option => option.value === currentLocale)?.value}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[120px]">
        {localeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <Image 
                src={option.flag} 
                className="w-4 h-4" 
                width={16} 
                height={16} 
                alt={option.alt} 
              />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

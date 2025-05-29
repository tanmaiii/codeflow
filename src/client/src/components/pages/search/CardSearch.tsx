import { TextDescription } from "@/components/ui/text";

import NameTags from "@/components/common/NameTags/NameTags";
import { Badge } from "@/components/ui/badge";
import MemberAvatar from "@/components/ui/member-avatar";
import TextHeading from "@/components/ui/text";
import { TYPE_COURSE } from "@/constants/object";
import { IMAGES } from "@/data/images";
import Image from "next/image";

interface ICardSearch {
  item : {
    title: string,
    description: string,
  },
  type: 'Course' | 'Post' | 'Topic'
}

// TODO: làm các loại card khác nhau
export default function CardSearch({item, type}: ICardSearch) {
    return (
        <div className="w-full h-fit p-3 border border-primary/50 bg-primary/10 rounded-xl flex flex-row gap-4 hover:bg-primary/20 transition-colors cursor-pointer">
          <div className="relative">
            <Image  
              src={IMAGES.DEFAULT_COURSE}
              alt="default"
              className="object-cover w-[200px] min-w-[200px] h-[120px] rounded-md cursor-pointer"
            />
            <div className="absolute top-1 left-1">
              <Badge variant="default" className="bg-zinc-900/40 text-white">
                {TYPE_COURSE.find(type => type.value === 'major')?.labelEn}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <TextDescription>{type}</TextDescription>
            <TextHeading lineClamp={2}>{item.title}</TextHeading>
            <NameTags
              className="mt-0"
              tags={[
                {
                  id: '1',
                  name: 'React',
                  description: 'React',
                },
                {
                  id: '2',
                  name: 'Next.js',
                  description: 'Next.js',
                },
              ]}
            />
            <MemberAvatar size={30} name="John Doe" />
            <div className="flex flex-row gap-2">
              <div className="flex flex-row items-center gap-1">
                <div>📁</div>
                <TextDescription>6</TextDescription>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div>👨‍🎓</div>
                <TextDescription>100</TextDescription>
              </div>
            </div>
          </div>
        </div>
      );
}
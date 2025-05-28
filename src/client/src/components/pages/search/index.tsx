'use client';
import { MyCheckbox } from '@/components/common/MyCheckbox';
import NameTags from '@/components/common/NameTags/NameTags';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { TYPE_COURSE } from '@/constants/object';
import { IMAGES } from '@/data/images';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import Image from 'next/image';

export default function Search() {
  const { data: tags } = useQ_Tag_GetAll();

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="grid grid-cols-12 gap-4 py-10 max-w-5xl w-full min-h-[90vh] mx-auto">
        <div className="col-span-8 h-full ">
          <TextHeading className="text-2xl font-bold mb-4">Kết quả tìm kiếm</TextHeading>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <div className="col-span-4">
          <div className="sticky top-20">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Lọc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 border-b pb-4 mb-4">
                  <TextHeading>Loại</TextHeading>
                  <MyCheckbox label="Tất cả" id="all" checked={true} onChange={() => {}} />
                  <MyCheckbox label="Khóa học" id="course" onChange={() => {}} />
                  <MyCheckbox label="Bài viết" id="post" onChange={() => {}} />
                  <MyCheckbox label="Đề tài" id="topic" onChange={() => {}} />
                </div>
                <div className="flex flex-col gap-2 border-b pb-4 mb-4">
                  <TextHeading>Loại khóa học</TextHeading>
                  <MyCheckbox label="Tất cả" id="all" checked={true} onChange={() => {}} />
                  <MyCheckbox label="Chuyên ngành" id="course" onChange={() => {}} />
                  <MyCheckbox label="Cơ sở ngành" id="post" onChange={() => {}} />
                  <MyCheckbox label="Môn hộc" id="topic" onChange={() => {}} />
                </div>
                <div className="flex flex-col gap-2 border-b pb-4 mb-4">
                  <TextHeading>Loại</TextHeading>
                  <div className="flex flex-row flex-wrap gap-x-1">
                    {tags?.data?.map(tag => (
                      <NameTags
                        key={tag.id}
                        tags={[
                          {
                            id: tag.id,
                            name: tag.name,
                            description: tag.description,
                          },
                        ]}
                        onClick={() => {
                          console.log(tag);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const Item = () => {
  return (
    <div className="w-full h-fit p-3  bg-primary/10 border border-primary/50 rounded-lg mb-4 flex flex-row gap-4 hover:bg-primary/20 transition-colors cursor-pointer">
      <div className="relative">
        <Image
          src={IMAGES.DEFAULT_COURSE}
          alt="default"
          className="object-cover w-[200px] h-[120px] rounded-md cursor-pointer"
        />
        <div className="absolute top-1 left-1">
          <Badge variant="default" className="bg-zinc-900/40 text-white">
            {TYPE_COURSE.find(type => type.value === 'major')?.labelEn}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TextHeading>Lorem, ipsum dolor sit amet consectetur adipisicing elit</TextHeading>
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
};

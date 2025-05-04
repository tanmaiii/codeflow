import SectionDivider from "@/components/common/SectionDivider/SectionDivider";
import { Card } from "@/components/ui/card";
import TextHeading from "@/components/ui/text";
import { IMAGES } from "@/data/images";
import Image from "next/image";

export default function Post_Detail_More() {
  return (
    <Card className="p-0">
      <div className="p-4">
        <TextHeading className="text-xl">More post CodeFlow</TextHeading>
        <SectionDivider className="my-2" />
        <div>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <div className="w-12 h-12 min-w-12 min-h-12 object-cover rounded-md bg-backgroud-1">
              <Image
                className="w-full h-full object-cover rounded-md bg-backgroud-1"
                src={IMAGES.DEFAULT_COURSE}
                alt="Post Thumbnail"
                width={100}
                height={100}
              />
            </div>
            <TextHeading className="text-lg font-medium leading-none text-color-2">
              Choosing the right programming language{" "}
            </TextHeading>
          </div>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <div className="w-12 h-12 min-w-12 min-h-12 object-cover rounded-md bg-backgroud-1 ">
              <Image
                className="w-full h-full object-cover rounded-md bg-backgroud-1"
                src={IMAGES.DEFAULT_COURSE}
                alt="Post Thumbnail"
                width={100}
                height={100}
              />
            </div>
            <TextHeading className="text-lg font-medium leading-none text-color-2">
              Choosing the right programming language{" "}
            </TextHeading>
          </div>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <div className="w-12 h-12 min-w-12 min-h-12 object-cover rounded-md bg-backgroud-1">
              <Image
                className="w-full h-full object-cover rounded-md bg-backgroud-1"
                src={IMAGES.DEFAULT_COURSE}
                alt="Post Thumbnail"
                width={100}
                height={100}
              />
            </div>
            <TextHeading className="text-lg font-medium leading-none text-color-2">
              Choosing the right programming language{" "}
            </TextHeading>
          </div>
        </div>
      </div>
    </Card>
  );
}

import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";


export default function Courses_Create() {
    return (
        <RichTextEditor
            content="xin chao"
            onChange={(value) => console.log(value)}
        />
    );
}
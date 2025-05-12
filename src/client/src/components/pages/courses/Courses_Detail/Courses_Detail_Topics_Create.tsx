import ActionCreate from '@/components/common/Action/ActionCreate';
import { Input } from '@/components/ui/input';

export default function Courses_Detail_Topics_Create() {
  return (
    <ActionCreate handleSubmit={() => {}}>
      <Input type="text" placeholder="Title" />
    </ActionCreate>
  );
}

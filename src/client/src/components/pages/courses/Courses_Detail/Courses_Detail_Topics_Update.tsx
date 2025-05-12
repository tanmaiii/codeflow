import ActionUpdate from '@/components/common/Action/ActionUpdate';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TopicSchema, TopicType } from './Courses_Detail_Topics';

export default function Courses_Detail_Topics_Update({ topic }: { topic: TopicType }) {
  const form = useForm<TopicType>({
    resolver: zodResolver(TopicSchema),
    defaultValues: topic,
  });
  const { register } = form;

  return (
    <ActionUpdate
      actionType="update"
      trigger={<Button variant="outline">Update</Button>}
      title="Update Topic"
      handleSubmit={values => {
        return console.log(values);
      }}
      reactHookForm={form}
    >
      <TextInput label="Title" {...register('title')} />
    </ActionUpdate>
  );
}

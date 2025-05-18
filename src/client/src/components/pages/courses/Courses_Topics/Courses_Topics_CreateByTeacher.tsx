'use client';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import { Button } from '@/components/ui/button';
import { ITopic } from '@/interfaces/topic';
import groupService from '@/services/group.service';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Courses_Topics_ChoiceTopic from './Courses_Topics_ChoiceTopic';

const members = [
  {
    value: '1',
    label: 'Nguyễn Văn A',
  },
  {
    value: '2',
    label: 'Nguyễn Văn B',
  },
  {
    value: '3',
    label: 'Nguyễn Văn C',
  },
];

export default function Courses_Topics_CreateByTeacher() {
  const tTopic = useTranslations('topic');
  const tCommon = useTranslations('common');
  const { id } = useParams();
  const [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null);
  const [groupName, setGroupName] = useState<string>('');

  const mutation = useMutation({
    mutationFn: () => {
      if (!selectedTopic?.id) {
        throw new Error('Topic is not selected');
      }

      return groupService.create({
        name: groupName,
        topicId: selectedTopic.id,
        members: [],
      });
    },
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
      setSelectedTopic(null);
      setGroupName('');
    },
    onError: () => {
      toast.error(tCommon('createError'));
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <Courses_Topics_ChoiceTopic
        onSelect={item => setSelectedTopic(item)}
        courseId={id as string}
      />
      <TextInput
        disabled
        label={tTopic('title')}
        defaultValue={selectedTopic?.title}
        className="w-full flex-1"
      />
      <TextareaInput
        disabled
        defaultValue={selectedTopic?.description}
        label={tTopic('description')}
        className="min-h-[200px]"
      />
      <TextInput
        label={'Tên nhóm'}
        name="name"
        placeholder={'Tên nhóm'}
        onChange={e => setGroupName(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <MyMultiSelect
          label={tTopic('members')}
          name="members"
          maxLength={2}
          options={members.map(member => ({
            value: member.value,
            label: member.label,
          }))}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="default"
          className="w-fit px-10"
          onClick={() => selectedTopic && mutation.mutate()}
        >
          {tCommon('register')}
        </Button>
      </div>
    </div>
  );
}

import ActionModal from '@/components/common/Action/ActionModal';
import { Button } from '@/components/ui/button';

export default function PasswordChangeModal() {
  return (
    <ActionModal
      title={'Change password'}
      actionType={'non-icon'}
      className="max-w-[600px]"
      icon={<Button className='h-12' variant="default">Change</Button>}
    >
      123
    </ActionModal>
  );
}

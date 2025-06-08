'use client';
import useQ_User_GetDetail from '@/hooks/query-hooks/User/useQ_User_GetDetail';
import { useParams } from 'next/navigation';
import UserDetail from './UserDetail';

export default function User() {
  const params = useParams();
  const userId = params?.id as string;

  const { data: User } = useQ_User_GetDetail({
    id: userId,
  });
  return (
    <div className="grid grid-cols-12 gap-4 bg-background-1 dark:bg-background-2 min-h-[100vh]">
      <div className="col-span-8 p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3 py-2"></div>
      </div>

      <div className="col-span-4 border-l border-border-1 dark:border-border-2">
        {User && <UserDetail user={User?.data} />}
      </div>
    </div>
  );
}

import ActionIcon from '@/components/common/Action/ActionIcon';
import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import useQ_User_GetAllStudent from '@/hooks/query-hooks/User/useQ_User_GetAllStudent';
import { useDebounce } from '@/hooks/useDebounce';
import { IUser } from '@/interfaces/user';
import courseService from '@/services/course.service';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ButtonAction = ({ userId, courseId }: { userId: string; courseId: string }) => {
  const { data: isJoined } = useQuery({
    queryKey: ['course', courseId, userId],
    queryFn: async () => {
      const response = await courseService.checkJoinCourse(courseId, userId);
      return response.data;
    },
    enabled: !!userId && !!courseId,
  });

  if (isJoined) return <IconCheck className="w-4 h-4" />;

  return (
    <ActionIcon
      actionType="default"
      onClick={() => {
        // console.log(user);
      }}
    >
      <IconPlus className="w-4 h-4" />
    </ActionIcon>
  );
};

export default function CoureseMemberCreate() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const keyworkDebounce = useDebounce(search, 500);
  const params = useParams();
  const id = params?.id as string;

  const { data: Users, isLoading } = useQ_User_GetAllStudent({
    params: {
      page: page,
      limit: 5,
      search: keyworkDebounce,
    },
  });

  // Reset danh sách khi search thay đổi
  useEffect(() => {
    setPage(1);
    setAllUsers([]);
  }, [keyworkDebounce]);

  // Cập nhật danh sách users khi có dữ liệu mới
  useEffect(() => {
    if (Users?.data) {
      if (page === 1) {
        // Nếu là trang đầu tiên, thay thế toàn bộ danh sách
        setAllUsers(Users.data);
      } else {
        // Nếu là trang tiếp theo, thêm vào danh sách hiện tại
        setAllUsers(prev => [...prev, ...Users.data]);
      }
    }
  }, [Users, page]);

  // Kiểm tra xem còn dữ liệu để load không
  const hasMoreData = Users?.pagination ? page < Users.pagination.totalPages : false;

  const handleLoadMore = () => {
    if (hasMoreData && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  const mutionAdd = useMutation({
    mutationFn: async () => {
      return;
    },
  });

  return (
    <ActionModal
      title={'Add member'}
      icon={
        <>
          <IconPlus className="w-4 h-4" />
          {'Add'}
        </>
      }
      actionType={'default'}
      className="max-w-[50vw]"
      onSubmit={() => mutionAdd.mutate()}
    >
      <TextInput
        label={'Member'}
        name={'member'}
        onChange={value => setSearch(value.target.value)}
        className="mb-4"
      />
      {allUsers.length > 0 && (
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {allUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between gap-2">
                <MemberAvatar
                  avatar={user.avatar ?? ''}
                  description={user?.username}
                  id={user.id}
                  name={user.name}
                />
                <div className="flex items-center gap-2">
                  <ButtonAction userId={user.id} courseId={id} />
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreData && (
            <div className="flex justify-center mt-3 pt-3 border-t">
              <Button variant="outline" size="sm" onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? 'Đang tải...' : 'Tải thêm'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Loading indicator for initial load */}
      {isLoading && allUsers.length === 0 && (
        <div className="flex justify-center py-4">
          <span className="text-sm text-gray-500">Đang tải...</span>
        </div>
      )}

      {/* No data message */}
      {!isLoading && allUsers.length === 0 && keyworkDebounce && (
        <div className="flex justify-center py-4">
          <span className="text-sm text-gray-500">Không tìm thấy sinh viên nào</span>
        </div>
      )}
    </ActionModal>
  );
}

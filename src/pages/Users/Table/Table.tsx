import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListUsers } from '@/hooks/data/useListUsers';
import CustomPagination from '@/components/CustomPagination';
import UpdateUserModal from '../UpdateUserModal';

const CustomTable = () => {
  const { users, pagination } = useListUsers();

  return (
    <div className='p-2 bg-white rounded-lg shadow-lg'>
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4 flex-1 max-w-md'>
            <div className='text-sm font-medium text-muted-foreground whitespace-nowrap w-48'>
              <span className='px-2 py-2 rounded-sm bg-blue-300 mr-4' />
              <span className='text-lg font-semibold'>{pagination?.total} Người dùng</span>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên đăng nhập</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                </span>
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>
                <UpdateUserModal user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination
        currentPage={pagination?.page || 1}
        totalPage={pagination?.totalPage || 1}
      />
    </div>
  );
};

export default CustomTable;

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/api/user';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(1, 10),
  });

  const filteredUsers = usersData?.data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
        <Button>Thêm người dùng mới</Button>
      </div>

      <div className='bg-white rounded-lg border shadow-sm'>
        <div className='p-4 border-b'>
          <div className='flex items-center gap-4'>
            <div className='text-sm font-medium text-muted-foreground'>
              {usersData?.total || 0} Người dùng
            </div>
            <div className='relative w-64'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Tìm kiếm...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-8'
              />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : filteredUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className='font-medium'>{user.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'dd MMMM yyyy', { locale: vi })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
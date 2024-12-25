import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  role: string[];
  createdAt: string;
}

// Sample data - replace with actual data source later
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    role: ['admin', 'user'],
    createdAt: '2024-03-20',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    role: ['user'],
    createdAt: '2024-03-19',
  },
];

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const customers = sampleCustomers;

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
        <Button>Thêm người dùng mới</Button>
      </div>

      <div className='bg-white rounded-lg border shadow-sm'>
        <div className='p-4 border-b'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4 flex-1 max-w-md'>
              <div className='text-sm font-medium text-muted-foreground whitespace-nowrap'>
                {customers.length} Người dùng
              </div>
              <div className='relative flex-1'>
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
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell className='font-medium'>{customer.name}</TableCell>
                <TableCell>{customer.role.join(', ')}</TableCell>
                <TableCell>{new Date(customer.createdAt).toLocaleDateString('vi-VN')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Users;

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  parentInfo: string;
  parentPhone: string;
  address: string;
  createdAt: string;
}

// Sample data - replace with actual data source later
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dateOfBirth: '2020-05-15',
    parentInfo: 'Nguyễn Văn B (Cha)',
    parentPhone: '0901234567',
    address: 'Hà Nội',
    createdAt: '2024-03-20',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    gender: 'Nữ',
    dateOfBirth: '2021-08-22',
    parentInfo: 'Trần Văn C (Cha)',
    parentPhone: '0909876543',
    address: 'Hồ Chí Minh',
    createdAt: '2024-03-19',
  },
];

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers] = useState<Customer[]>(sampleCustomers);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.parentInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.parentPhone.includes(searchTerm)
  );

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý bệnh nhi</h1>
        <Button>Thêm bệnh nhi mới</Button>
      </div>

      <div className='flex items-center space-x-2 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm theo tên bệnh nhi, phụ huynh hoặc số điện thoại...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-8'
          />
        </div>
      </div>

      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ và tên BN</TableHead>
              <TableHead>Giới tính</TableHead>
              <TableHead>Ngày sinh</TableHead>
              <TableHead>Phụ huynh & SĐT</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className='font-medium'>{customer.name}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>{new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>
                  <div>{customer.parentInfo}</div>
                  <div className='text-sm text-gray-500'>{customer.parentPhone}</div>
                </TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{new Date(customer.createdAt).toLocaleDateString('vi-VN')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Customers;

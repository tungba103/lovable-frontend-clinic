import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListCustomers } from '@/hooks/data/useListCustomers';
import CustomPagination from '@/components/CustomPagination';
import UpdateCustomerModal from '../UpdateCustomerModal';

const CustomTable = () => {
  const { customers, pagination } = useListCustomers();

  return (
    <div className='p-2 bg-white rounded-lg shadow-lg'>
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4 flex-1 max-w-md'>
            <div className='text-sm font-medium text-muted-foreground whitespace-nowrap w-48'>
              <span className='px-2 py-2 rounded-sm bg-blue-300 mr-4' />
              <span className='text-lg font-semibold'>{pagination?.total} Bệnh nhi</span>
            </div>
          </div>
        </div>
      </div>

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
          {customers?.map((customer) => (
            <TableRow
              key={customer.id}
              className='cursor-pointer'
            >
              <TableCell className='font-medium'>{customer.name}</TableCell>
              <TableCell>{customer.gender === 'MALE' ? 'Nam' : 'Nữ'}</TableCell>
              <TableCell>{new Date(customer.birthDate).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>
                <div>{customer.parentName}</div>
                <div className='text-sm text-gray-500'>{customer.parentPhone}</div>
              </TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{new Date(customer.createdAt).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell className=''>
                <UpdateCustomerModal customer={customer} />
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

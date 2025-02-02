import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListCustomers } from '@/hooks/data/useListCustomers';
import CustomPagination from '@/components/CustomPagination';
import UpdateCustomerModal from '../UpdateCustomerModal';
import { useCustomerModal } from '@/contexts/CustomerModal/CustomerModalContext';
import TableLoading from '@/components/Table/TableLoading';
import TableEmpty from '@/components/Table/TableEmpty';
import { customFormatDate } from '@/utils/format-date.util';
import { Customer } from '@/types/api/customer';

const CustomTable = () => {
  const { data: customers, isLoading, pagination } = useListCustomers();
  const { openCustomerModal } = useCustomerModal();

  return (
    <div className='p-2 bg-white rounded-lg shadow-lg'>
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4 flex-1 max-w-md'>
            <div className='text-sm font-medium text-muted-foreground whitespace-nowrap w-48'>
              <span className='px-2 py-2 rounded-sm bg-blue-300 mr-4' />
              <span className='text-lg font-semibold'>{pagination?.total ?? '-'} Bệnh nhân</span>
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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {isLoading && <TableLoading />}
        {!isLoading && customers && customers.length === 0 && <TableEmpty />}
        {!isLoading && customers && customers.length > 0 && (
          <TableBody>
            {customers?.map((customer) => (
              <TableRow
                key={customer.id}
                className='cursor-pointer'
                onClick={() => openCustomerModal(customer.id)}
              >
                <TableCell className='font-medium'>{customer.name}</TableCell>
                <TableCell>{customer.gender === 'MALE' ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell>{customer.birthDate ? customFormatDate(new Date(customer.birthDate)) : '-'}</TableCell>
                <TableCell>
                  <div>{customer.parentName}</div>
                  <div className='text-sm text-gray-500'>{customer.parentPhone}</div>
                </TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.createdAt ? customFormatDate(new Date(customer.createdAt)) : '-'}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <UpdateCustomerModal customer={customer as Customer} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <CustomPagination
        currentPage={pagination?.page || 1}
        totalPage={pagination?.totalPage || 1}
      />
    </div>
  );
};

export default CustomTable;

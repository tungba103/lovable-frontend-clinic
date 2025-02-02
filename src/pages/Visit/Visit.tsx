import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomPagination from '@/components/CustomPagination';
import SearchInput from '@/components/SearchInput';
import CreateVisitButton from './components/CreateVisitButton';
import { useListVisits } from '@/hooks/data/useListVisits';
import { Badge } from '@/components/ui/badge';
import { useCustomerModal } from '@/contexts/CustomerModal/CustomerModalContext';
import TableLoading from '@/components/Table/TableLoading';
import TableEmpty from '@/components/Table/TableEmpty';

const VisitStatusSettings = {
  NEW: {
    color: 'bg-blue-400 text-white hover:bg-blue-400 text-sm px-2 py-0.5',
    text: 'Chưa khám',
  },
  IN_PROGRESS: {
    color: 'bg-orange-400 text-white hover:bg-orange-400 text-sm px-2 py-0.5',
    text: 'Đang khám',
  },
  COMPLETED: {
    color: 'bg-green-400 text-white hover:bg-green-400 text-sm px-2 py-0.5',
    text: 'Đã khám',
  },
  CANCELLED: {
    color: 'bg-gray-400 text-white hover:bg-gray-400 text-sm px-2 py-0.5',
    text: 'Hủy khám',
  },
};

const VisitsPage = () => {
  const { visits, pagination, isLoading } = useListVisits();
  const { openCustomerModal } = useCustomerModal();

  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý lượt khám</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateVisitButton />
        <SearchInput />
      </div>

      <div className='p-2 bg-white rounded-lg shadow-lg'>
        <div className='p-4 border-b'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4 flex-1 max-w-md'>
              <div className='text-sm font-medium text-muted-foreground whitespace-nowrap w-48'>
                <span className='px-2 py-2 rounded-sm bg-blue-300 mr-4' />
                <span className='text-lg font-semibold'>{pagination?.total ?? '-'} Lượt khám</span>
              </div>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bệnh nhi</TableHead>
              <TableHead>Phụ huynh & SĐT</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Người tạo</TableHead>
              <TableHead>Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading && <TableLoading colSpan={5} />}
          {!isLoading && visits && visits.length === 0 && <TableEmpty colSpan={5} />}
          {!isLoading && visits && visits.length > 0 && (
            <TableBody>
              {visits?.map((visit) => (
                <TableRow
                  key={visit.id}
                  className='cursor-pointer hover:bg-gray-100'
                  onClick={() => openCustomerModal(visit.customer.id)}
                >
                  <TableCell className='font-medium'>
                    {visit.customer.name}{' '}
                    {visit.countByCustomer === 1 && (
                      <Badge className='bg-red-400 text-white hover:bg-red-400 text-sm px-2 ml-1 py-0.5'>Mới</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>{visit.customer.parentName}</div>
                    <div className='text-sm text-gray-500'>{visit.customer.parentPhone}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={VisitStatusSettings[visit.status].color}>
                      {VisitStatusSettings[visit.status].text}
                    </Badge>
                  </TableCell>
                  <TableCell>{visit.creatorName}</TableCell>
                  <TableCell>{new Date(visit.createdAt).toLocaleDateString('vi-VN')}</TableCell>
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
    </div>
  );
};

export default VisitsPage;

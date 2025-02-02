import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListServices } from '@/hooks/data/useListServices';
import CustomPagination from '@/components/CustomPagination';
import UpdateServiceModal from '../UpdateServiceModal';
import TableEmpty from '@/components/Table/TableEmpty';
import TableLoading from '@/components/Table/TableLoading';
import { customFormatDate } from '@/utils/format-date.util';

const CustomTable = () => {
  const { data: services, pagination, isLoading } = useListServices();

  return (
    <div className='p-2 bg-white rounded-lg shadow-lg'>
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4 flex-1 max-w-md'>
            <div className='text-sm font-medium text-muted-foreground whitespace-nowrap w-48'>
              <span className='px-2 py-2 rounded-sm bg-blue-300 mr-4' />
              <span className='text-lg font-semibold'>{pagination?.total ?? '-'} Dịch vụ</span>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên dịch vụ</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {isLoading && <TableLoading colSpan={6} />}
        {!isLoading && services && services.length === 0 && <TableEmpty colSpan={6} />}
        {!isLoading && services && services.length > 0 && (
          <TableBody>
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell className='font-medium'>{service.name}</TableCell>
                <TableCell>{service.serviceCategory.name}</TableCell>
                <TableCell>{service.price.toLocaleString('vi-VN')} đ</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      service.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {service.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </TableCell>
                <TableCell>{customFormatDate(new Date(service.createdAt))}</TableCell>
                <TableCell>
                  <UpdateServiceModal service={service} />
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

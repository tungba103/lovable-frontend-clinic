import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomPagination from '@/components/CustomPagination';
import UpdateProductCategoryModal from '../UpdateProductCategoryModal';
import { useListProductCategories } from '@/hooks/data/useListProductCategories';
import TableLoading from '@/components/Table/TableLoading';
import TableEmpty from '@/components/Table/TableEmpty';

const CustomTable = () => {
  const { productCategories, pagination, isLoading } = useListProductCategories();

  return (
    <div className='p-2 bg-white rounded-lg shadow-lg'>
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4 flex-1 max-w-md'>
            <div className='text-sm font-medium text-muted-foreground whitespace-nowrap w-48'>
              <span className='px-2 py-2 rounded-sm bg-blue-300 mr-4' />
              <span className='text-lg font-semibold'>{pagination?.total ?? '-'} Danh mục</span>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {isLoading && <TableLoading colSpan={5} />}
        {!isLoading && productCategories && productCategories.length === 0 && <TableEmpty colSpan={5} />}
        {!isLoading && productCategories && productCategories.length > 0 && (
          <TableBody>
            {productCategories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </TableCell>
                <TableCell>{new Date(category.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>
                  <UpdateProductCategoryModal productCategory={category} />
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

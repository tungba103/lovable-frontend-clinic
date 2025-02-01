import { Skeleton } from '../ui/skeleton';
import { TableCell, TableRow } from '../ui/table';

import { TableBody } from '../ui/table';

const TableLoading = ({ colSpan = 7, rowCount = 10 }: { colSpan?: number; rowCount?: number }) => {
  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={colSpan}>
            <Skeleton className='h-10 w-full' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoading;

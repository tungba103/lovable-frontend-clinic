import { useListVisitsByCustomerId } from '@/hooks/data/useListVisitsByCustomerId';
import { useEffect } from 'react';
import { customFormatDate } from '@/utils/format-date.util';
import { Skeleton } from '@/components/ui/skeleton';
import { useVisitContext } from '../useVisitContext';

interface VisitHistoryProps {
  customerId: number;
}

const VisitHistory = ({ customerId }: VisitHistoryProps) => {
  const { visits: customerVisits, isLoading } = useListVisitsByCustomerId({ customerId });
  const { selectedVisitId, setSelectedVisitId } = useVisitContext();

  // Set the first visit as default when visits are loaded
  useEffect(() => {
    // console.log('[VisitHistory] Set default visit', isLoading);
    if (isLoading) return;
    setSelectedVisitId(customerVisits?.[0]?.id || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // console.log('[VisitHistory] ----------------------');

  return (
    <div className='w-96 rounded-lg'>
      <div className='h-[88vh] overflow-y-auto rounded-lg'>
        <table className='w-full'>
          <thead className='bg-blue-200 sticky top-0 rounded-lg'>
            <tr>
              <th className='text-left font-medium p-2'>Ngày đến</th>
              <th className='text-left font-medium p-2'>Bác sĩ</th>
              <th className='text-left font-medium p-2'>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td
                    colSpan={3}
                    className='text-center p-2'
                  >
                    <Skeleton className='h-8 w-full' />
                  </td>
                </tr>
              ))}
            {customerVisits?.map((visit) => (
              <tr
                key={visit.id}
                className={`hover:bg-gray-100 cursor-pointer border-b-2 border-gray-200 ${
                  selectedVisitId === visit.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => setSelectedVisitId(visit.id)}
              >
                <td className='p-2'>{customFormatDate(new Date(visit.createdAt))}</td>
                <td className='p-2'>{visit.creatorName || 'N/A'}</td>
                <td className='p-2'>{visit.totalAmount?.toLocaleString('vi-VN') || 0} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitHistory;

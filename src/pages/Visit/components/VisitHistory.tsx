import { useListVisitsByCustomerId } from '@/hooks/data/useListVisitsByCustomerId';
import { useVisit } from '@/contexts/VisitContext';
import { useEffect } from 'react';

interface VisitHistoryProps {
  customerId: number;
}

const VisitHistory = ({ customerId }: VisitHistoryProps) => {
  const { visits: customerVisits } = useListVisitsByCustomerId({ customerId });
  const { selectedVisitId, setSelectedVisitId } = useVisit();

  // Set the first visit as default when visits are loaded
  useEffect(() => {
    if (customerVisits && customerVisits.length > 0) {
      setSelectedVisitId(customerVisits[0].id);
    }
  }, [customerVisits, setSelectedVisitId]);

  return (
    <div className='w-96'>
      <div className='h-[88vh] overflow-y-auto'>
        <table className='w-full'>
          <thead className='bg-blue-200 sticky top-0'>
            <tr>
              <th className='text-left font-medium p-2'>Ngày đến</th>
              <th className='text-left font-medium p-2'>Bác sĩ</th>
              <th className='text-left font-medium p-2'>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {customerVisits?.map((visit) => (
              <tr
                key={visit.id}
                className={`hover:bg-gray-100 cursor-pointer border-b-2 border-gray-200 ${
                  selectedVisitId === visit.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => setSelectedVisitId(visit.id)}
              >
                <td className='p-2'>{new Date(visit.createdAt).toLocaleDateString('vi-VN')}</td>
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

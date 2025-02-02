import VisitDetail from './VisitDetail/VisitDetail';
import { useState } from 'react';
import VisitHistory from './VisitDetail/VisitHistory';
import { VisitContext } from './useVisitContext';

interface VisitTabProps {
  customerId: number;
}

const VisitTab = ({ customerId }: VisitTabProps) => {
  const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);

  console.log('[VisitTab] ----------------------');

  return (
    <VisitContext.Provider value={{ selectedVisitId, setSelectedVisitId }}>
      <div className='flex gap-4'>
        <VisitHistory customerId={customerId} />
        <VisitDetail />
      </div>
    </VisitContext.Provider>
  );
};

export default VisitTab;

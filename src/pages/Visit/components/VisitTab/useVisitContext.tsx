import { createContext, useContext } from 'react';

interface VisitContextType {
  selectedVisitId: number | null;
  setSelectedVisitId: (id: number | null) => void;
}

export const VisitContext = createContext<VisitContextType | undefined>(undefined);

export const useVisitContext = () => {
  console.log('useVisitContext');
  const context = useContext(VisitContext);
  if (context === undefined) {
    throw new Error('useVisit must be used within a VisitProvider');
  }
  return context;
};

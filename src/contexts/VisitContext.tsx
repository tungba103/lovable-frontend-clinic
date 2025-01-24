import { createContext, useContext, useState } from 'react';

interface VisitContextType {
  selectedVisitId: number | null;
  setSelectedVisitId: (id: number | null) => void;
}

const VisitContext = createContext<VisitContextType | undefined>(undefined);

export function VisitProvider({ children }: { children: React.ReactNode }) {
  const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);

  return <VisitContext.Provider value={{ selectedVisitId, setSelectedVisitId }}>{children}</VisitContext.Provider>;
}

export function useVisit() {
  const context = useContext(VisitContext);
  if (context === undefined) {
    throw new Error('useVisit must be used within a VisitProvider');
  }
  return context;
}

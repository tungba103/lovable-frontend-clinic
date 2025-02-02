import { useContext } from 'react';
import { createContext } from 'react';

interface CustomerModalContextType {
  openCustomerModal: (customerId: number | null) => void;
  closeCustomerModal: () => void;
}

export const CustomerModalContext = createContext<CustomerModalContextType | undefined>(undefined);

export const useCustomerModal = () => {
  const context = useContext(CustomerModalContext);
  if (context === undefined) {
    throw new Error('useCustomerModal must be used within a CustomerModalProvider');
  }
  return context;
};

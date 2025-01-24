import { createContext, useContext } from 'react';
import CustomerModal from '@/pages/Visit/CustomerModal';
import useQueryString from '@/hooks/useQueryString';

interface CustomerModalContextType {
  openCustomerModal: (customerId: number | null) => void;
  closeCustomerModal: () => void;
}

const CustomerModalContext = createContext<CustomerModalContextType | undefined>(undefined);

export function CustomerModalProvider({ children }: { children: React.ReactNode }) {
  const { setQueryString, queryString } = useQueryString();
  const { customerId } = queryString;

  const openCustomerModal = (customerId: number | null) => {
    setQueryString({ ...queryString, customerId: customerId?.toString() ?? '' });
  };

  const closeCustomerModal = () => {
    setQueryString({ ...queryString, customerId: '' });
  };

  return (
    <CustomerModalContext.Provider value={{ openCustomerModal, closeCustomerModal }}>
      {children}
      <CustomerModal
        open={!!customerId}
        onOpenChange={() => closeCustomerModal()}
        customerId={customerId ? Number(customerId) : null}
      />
    </CustomerModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCustomerModal() {
  const context = useContext(CustomerModalContext);
  if (context === undefined) {
    throw new Error('useCustomerModal must be used within a CustomerModalProvider');
  }
  return context;
}

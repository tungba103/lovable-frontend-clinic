import CustomerModal from '@/pages/Visit/components/CustomerModal';
import { CustomerModalContext } from './CustomerModalContext';
import { useState } from 'react';

export function CustomerModalProvider({ children }: { children: React.ReactNode }) {
  const [customerId, setCustomerId] = useState<number | null>(null);

  const openCustomerModal = (customerId: number | null) => {
    setCustomerId(customerId);
  };

  const closeCustomerModal = () => {
    setCustomerId(null);
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

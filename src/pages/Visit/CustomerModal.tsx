import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCustomer } from '@/hooks/data/useCustomer';
import VisitHistory from './components/VisitHistory';
import VisitDetail from './components/VisitDetail';
import { VisitProvider } from '@/contexts/VisitContext';

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: number | null;
}

const CustomerModal = ({ open, onOpenChange, customerId }: CustomerModalProps) => {
  const { customer, isLoading } = useCustomer(customerId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-w-full h-screen'>
        <DialogHeader>
          <DialogTitle className='mb-2'>
            {customer?.name} | {customer?.parentPhone} | {customer?.gender === 'MALE' ? 'Nam' : 'Nữ'} |{' '}
            {customer?.birthDate ? new Date(customer?.birthDate).toLocaleDateString('vi-VN') : ''}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <VisitProvider>
          <div className='flex gap-4'>
            <VisitHistory customerId={customerId || 0} />
            <VisitDetail />
          </div>
        </VisitProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerModal;

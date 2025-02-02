import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCustomer } from '@/hooks/data/useCustomer';
import { customFormatDate } from '@/utils/format-date.util';
import VisitTab from './VisitTab/VisitTab';

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

  console.log('CustomerModal');

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-w-full h-screen'>
        <DialogHeader>
          <DialogTitle className='mb-2'>
            {customer?.name} | {customer?.parentPhone} | {customer?.gender === 'MALE' ? 'Nam' : 'Nữ'} |{' '}
            {customer?.birthDate ? customFormatDate(new Date(customer?.birthDate)) : ''}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {customerId && <VisitTab customerId={customerId} />}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerModal;

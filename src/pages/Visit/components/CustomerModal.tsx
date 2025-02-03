import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCustomer } from '@/hooks/data/useCustomer';
import { customFormatDate } from '@/utils/format-date.util';
import VisitTab from './VisitTab/VisitTab';
import { Plus } from 'lucide-react';
import { useVisitMutation } from '@/hooks/data/useVisitMutation';
import AsyncButton from '@/components/AsyncButton';
import { useQueryClient } from '@tanstack/react-query';

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: number | null;
}

const CustomerModal = ({ open, onOpenChange, customerId }: CustomerModalProps) => {
  const { customer, isLoading } = useCustomer(customerId);

  const { createMutation: createVisitMutation } = useVisitMutation();

  const queryClient = useQueryClient();

  const handleCreateVisit = () => {
    if (!customerId) return;
    createVisitMutation.mutate(
      {
        customerId,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['visits', '1', '100', customerId],
          });
        },
      }
    );
  };

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
          <DialogTitle className='mb-2 flex justify-start items-center'>
            <span>
              {customer?.name} | {customer?.parentPhone} | {customer?.gender === 'MALE' ? 'Nam' : 'Nữ'} |{' '}
              {customer?.birthDate ? customFormatDate(new Date(customer?.birthDate)) : ''} |
            </span>
            <AsyncButton
              className='ml-2'
              size='sm'
              onClick={handleCreateVisit}
              isLoading={createVisitMutation.isPending}
            >
              <Plus />
              <span>Thêm lượt khám mới</span>
            </AsyncButton>
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {customerId && <VisitTab customerId={customerId} />}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerModal;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CircleXIcon } from 'lucide-react';
import { useVisitMutation } from '@/hooks/data/useVisitMutation';
import AsyncButton from '@/components/AsyncButton';
import { Button } from '@/components/ui/button';

interface CancelVisitModalProps {
  visitId: number;
}

const CancelVisitModal = ({ visitId }: CancelVisitModalProps) => {
  const [open, setOpen] = useState(false);
  const { cancelMutation } = useVisitMutation();

  const handleCancel = () => {
    cancelMutation.mutate(visitId);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        <div className='text-red-400 hover:text-red-500 cursor-pointer w-fit rounded-full'>
          <CircleXIcon className='w-6 h-6' />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>Hủy lượt khám</DialogTitle>
          <DialogDescription className=''>Bạn có chắc chắn muốn hủy lượt khám này không?</DialogDescription>
        </DialogHeader>
        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Hủy
          </Button>
          <AsyncButton
            variant='destructive'
            isLoading={cancelMutation.isPending}
            onClick={handleCancel}
          >
            Xác nhận
          </AsyncButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelVisitModal;

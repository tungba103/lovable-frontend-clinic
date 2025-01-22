import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useVisitMutation } from '@/hooks/data/useVisitMutation';
import { CreateVisitRequest } from '@/types/api/visit';
import { useState } from 'react';
import VisitForm from './VisitForm';
import { visitFormSchema } from '@/validations/VisitSchema';

const CreateVisitButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useVisitMutation();

  const form = useForm<z.infer<typeof visitFormSchema>>({
    resolver: zodResolver(visitFormSchema),
  });

  function onSubmit(values: z.infer<typeof visitFormSchema>) {
    const data: CreateVisitRequest = {
      customerId: values.customerId,
    };

    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button>
          <Plus />
          <span>Thêm lượt khám mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Thêm lượt khám mới
          </DialogTitle>
          <VisitForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVisitButton;

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useServiceMutation } from '@/hooks/data/useServiceMutation';
import { CreateServiceRequest } from '@/types/api/service';
import { useState } from 'react';
import ServiceForm from './ServiceForm';
import { serviceFormSchema } from '@/validations/ServiceSchema';

const CreateServiceButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useServiceMutation();

  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
  });

  function onSubmit(values: z.infer<typeof serviceFormSchema>) {
    const data: CreateServiceRequest = {
      name: values.name,
      serviceCategoryId: values.serviceCategoryId,
      price: values.price,
      description: values.description || '',
      status: values.status ?? 'ACTIVE',
    };

    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
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
          <span>Thêm dịch vụ mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Thêm dịch vụ mới
          </DialogTitle>
          <ServiceForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceButton;

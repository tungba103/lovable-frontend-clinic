import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCustomerMutation } from '@/hooks/data/useCustomerMutation';
import { CreateCustomerRequest } from '@/types/api/customer';
import { useState } from 'react';
import CustomerForm from './CustomerForm';
import { customerFormSchema } from '@/validations/CustomerSchema';

const CreateCustomerButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useCustomerMutation();

  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      gender: 'MALE',
    },
  });

  function onSubmit(values: z.infer<typeof customerFormSchema>) {
    const data: CreateCustomerRequest = {
      name: values.name,
      gender: values.gender,
      birthDate: values.birthDate,
      parentName: values.parentName,
      parentPhone: values.parentPhone,
      address: values.address,
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
          <span>Thêm bệnh nhi mới</span>
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
            Tạo khách hàng mới
          </DialogTitle>
          <CustomerForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomerButton;

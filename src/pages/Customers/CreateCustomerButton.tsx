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
      birthDate: values.birthDate.toISOString(),
      parentName: values.parentName,
      parentPhone: values.parentPhone,
      address: values.address,
    };
    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        switch (error.response?.data?.message) {
          case 'Name And Parent phone number already exists':
            form.setError('name', { message: 'Bệnh nhân đã tồn tại' });
            form.setError('parentPhone', { message: 'Số điện thoại đã tồn tại' });
            break;
          case 'Name And Birth Date already exists':
            form.setError('name', { message: 'Bệnh nhân đã tồn tại' });
            form.setError('birthDate', { message: 'Ngày sinh đã tồn tại' });
            break;
          default:
        }
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
            Thêm bệnh nhi mới
          </DialogTitle>
          <CustomerForm
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

export default CreateCustomerButton;

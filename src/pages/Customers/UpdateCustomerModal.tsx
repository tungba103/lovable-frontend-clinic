import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PenLine } from 'lucide-react';
import { useCustomerMutation } from '@/hooks/data/useCustomerMutation';
import { Customer, UpdateCustomerRequest } from '@/types/api/customer';
import { useState } from 'react';
import CustomerForm from './CustomerForm';
import { useForm } from 'react-hook-form';
import { customerFormSchema } from '@/validations/CustomerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IProps {
  customer: Customer;
}

const UpdateCustomerModal = ({ customer }: IProps) => {
  const [open, setOpen] = useState(false);
  const { updateMutation } = useCustomerMutation();

  console.log('customer', customer);

  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      ...customer,
      birthDate: customer.birthDate,
    },
  });
  const handleSubmit = (data: UpdateCustomerRequest) => {
    updateMutation.mutate(
      { customerId: customer.id, data },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <PenLine className='w-4 h-4 text-gray-500 hover:text-gray-900' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Cập nhật thông tin khách hàng
          </DialogTitle>
          <CustomerForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCustomerModal;

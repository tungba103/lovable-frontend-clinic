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

  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      ...customer,
      birthDate: new Date(customer.birthDate),
    },
  });
  const handleSubmit = (values: z.infer<typeof customerFormSchema>) => {
    const data: UpdateCustomerRequest = {
      name: values.name,
      gender: values.gender,
      birthDate: values.birthDate.toISOString(),
      parentName: values.parentName,
      parentPhone: values.parentPhone,
      address: values.address,
    };
    updateMutation.mutate(
      { customerId: customer.id, data },
      {
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
      }
    );
  };

  if (!customer) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <div className='p-2 w-fit rounded-full hover:bg-gray-200 group'>
          <PenLine className='w-4 h-4 text-gray-500 group-hover:text-gray-900' />
        </div>
      </DialogTrigger>
      {customer && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-8'>
              <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
              Cập nhật thông tin bệnh nhi
            </DialogTitle>
            <CustomerForm
              form={form}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isLoading={updateMutation.isPending}
            />
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default UpdateCustomerModal;

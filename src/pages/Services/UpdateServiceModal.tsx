import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PenLine } from 'lucide-react';
import { useServiceMutation } from '@/hooks/data/useServiceMutation';
import { Service, UpdateServiceRequest } from '@/types/api/service';
import { useState } from 'react';
import ServiceForm from './ServiceForm';
import { useForm } from 'react-hook-form';
import { serviceFormSchema } from '@/validations/ServiceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IProps {
  service: Service;
}

const UpdateServiceModal = ({ service }: IProps) => {
  const [open, setOpen] = useState(false);
  const { updateMutation } = useServiceMutation();

  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service.name,
      serviceCategoryId: service.serviceCategoryId,
      price: service.price,
      description: service.description,
      status: service.status,
    },
  });

  const handleSubmit = (data: UpdateServiceRequest) => {
    updateMutation.mutate(
      { serviceId: service.id, data },
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
        <div className='p-2 w-fit rounded-full hover:bg-gray-200 group'>
          <PenLine className='w-4 h-4 text-gray-500 group-hover:text-gray-900' />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Cập nhật thông tin dịch vụ
          </DialogTitle>
          <ServiceForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            isLoading={updateMutation.isPending}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateServiceModal;

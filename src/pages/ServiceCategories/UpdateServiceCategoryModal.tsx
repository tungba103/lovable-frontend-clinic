import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PenLine } from 'lucide-react';
import { useServiceCategoryMutation } from '@/hooks/data/useServiceCategoryMutation';
import { ServiceCategory } from '@/types/api/serviceCategory';
import { useState } from 'react';
import ServiceCategoryForm from './ServiceCategoryForm';
import { useForm } from 'react-hook-form';
import { serviceCategoryFormSchema } from '@/validations/ServiceCategorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IProps {
  category: ServiceCategory;
}

const UpdateServiceCategoryModal = ({ category }: IProps) => {
  const [open, setOpen] = useState(false);
  const { updateMutation } = useServiceCategoryMutation();

  const form = useForm<z.infer<typeof serviceCategoryFormSchema>>({
    resolver: zodResolver(serviceCategoryFormSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const handleSubmit = (data: z.infer<typeof serviceCategoryFormSchema>) => {
    updateMutation.mutate(
      { serviceCategoryId: category.id, data },
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
            Cập nhật thông tin danh mục
          </DialogTitle>
          <ServiceCategoryForm
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

export default UpdateServiceCategoryModal;

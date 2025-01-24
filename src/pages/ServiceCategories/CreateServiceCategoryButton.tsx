import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useServiceCategoryMutation } from '@/hooks/data/useServiceCategoryMutation';
import { CreateServiceCategoryRequest } from '@/types/api/serviceCategory';
import { useState } from 'react';
import ServiceCategoryForm from './ServiceCategoryForm';
import { serviceCategoryFormSchema } from '@/validations/ServiceCategorySchema';

const CreateServiceCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useServiceCategoryMutation();

  const form = useForm<z.infer<typeof serviceCategoryFormSchema>>({
    resolver: zodResolver(serviceCategoryFormSchema),
  });

  function onSubmit(values: z.infer<typeof serviceCategoryFormSchema>) {
    const data: CreateServiceCategoryRequest = {
      name: values.name,
      description: values.description || '',
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
          <span>Thêm danh mục mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Thêm danh mục mới
          </DialogTitle>
          <ServiceCategoryForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceCategoryButton;

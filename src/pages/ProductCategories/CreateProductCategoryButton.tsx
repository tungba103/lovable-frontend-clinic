import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useProductCategoryMutation } from '@/hooks/data/useProductCategoryMutation';
import { CreateProductCategoryRequest } from '@/types/api/productCategory';
import { useState } from 'react';
import ProductCategoryForm from './ProductCategoryForm';
import { productCategoryFormSchema } from '@/validations/ProductCategorySchema';

const CreateProductCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useProductCategoryMutation();

  const form = useForm<z.infer<typeof productCategoryFormSchema>>({
    resolver: zodResolver(productCategoryFormSchema),
  });

  function onSubmit(values: z.infer<typeof productCategoryFormSchema>) {
    const data: CreateProductCategoryRequest = {
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
          <ProductCategoryForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductCategoryButton;

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useProductMutation } from '@/hooks/data/useProductMutation';
import { CreateProductRequest } from '@/types/api/product';
import { useState } from 'react';
import ProductForm from './ProductForm';
import { productFormSchema } from '@/validations/ProductSchema';

const CreateProductButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useProductMutation();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
  });

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    const data: CreateProductRequest = {
      name: values.name,
      productCategoryId: values.productCategoryId,
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
          <span>Thêm thuốc mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Thêm thuốc mới
          </DialogTitle>
          <ProductForm
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

export default CreateProductButton;

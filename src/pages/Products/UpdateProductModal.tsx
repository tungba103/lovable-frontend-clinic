import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PenLine } from 'lucide-react';
import { useProductMutation } from '@/hooks/data/useProductMutation';
import { Product, UpdateProductRequest } from '@/types/api/product';
import { useState } from 'react';
import ProductForm from './ProductForm';
import { useForm } from 'react-hook-form';
import { productFormSchema } from '@/validations/ProductSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IProps {
  product: Product;
}

const UpdateProductModal = ({ product }: IProps) => {
  const [open, setOpen] = useState(false);
  const { updateMutation } = useProductMutation();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      productCategoryId: product.productCategoryId,
      price: product.price,
      description: product.description,
      status: product.status,
    },
  });

  const handleSubmit = (data: UpdateProductRequest) => {
    updateMutation.mutate(
      { productId: product.id, data },
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
            Cập nhật thông tin thuốc
          </DialogTitle>
          <ProductForm
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

export default UpdateProductModal;

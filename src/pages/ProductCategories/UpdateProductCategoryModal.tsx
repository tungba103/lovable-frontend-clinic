import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PenLine } from 'lucide-react';
import { useProductCategoryMutation } from '@/hooks/data/useProductCategoryMutation';
import { ProductCategory, UpdateProductCategoryRequest } from '@/types/api/productCategory';
import { useState } from 'react';
import ProductCategoryForm from './ProductCategoryForm';
import { useForm } from 'react-hook-form';
import { productCategoryFormSchema } from '@/validations/ProductCategorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IProps {
  productCategory: ProductCategory;
}

const UpdateProductCategoryModal = ({ productCategory }: IProps) => {
  const [open, setOpen] = useState(false);
  const { updateMutation } = useProductCategoryMutation();

  const form = useForm<z.infer<typeof productCategoryFormSchema>>({
    resolver: zodResolver(productCategoryFormSchema),
    defaultValues: {
      name: productCategory.name,
      description: productCategory.description,
    },
  });

  const handleSubmit = (data: UpdateProductCategoryRequest) => {
    updateMutation.mutate(
      { productCategoryId: productCategory.id, data },
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
          <ProductCategoryForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductCategoryModal;

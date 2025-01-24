import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { productFormSchema } from '@/validations/ProductSchema';
import { z } from 'zod';
import { useListProductCategories } from '@/hooks/data/useListProductCategories';

type ProductFormProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  onSubmit: (values: z.infer<typeof productFormSchema>) => void;
  onCancel: () => void;
};

const ProductForm = ({ form, onSubmit, onCancel }: ProductFormProps) => {
  const { productCategories } = useListProductCategories();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên thuốc</FormLabel>
              <FormControl>
                <Input
                  placeholder='Thuốc A'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='productCategoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục</FormLabel>
              <FormControl>
                <select
                  className='w-full p-2 border rounded-md'
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  <option value=''>Chọn danh mục</option>
                  {productCategories?.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='100000'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả thuốc</FormLabel>
              <FormControl>
                <Input
                  placeholder='Mô tả thuốc'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            className='px-4'
            onClick={onCancel}
            type='button'
          >
            Hủy
          </Button>
          <Button
            className='px-4'
            type='submit'
          >
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;

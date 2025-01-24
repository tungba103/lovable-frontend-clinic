import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { serviceFormSchema } from '@/validations/ServiceSchema';
import { z } from 'zod';
import { useListServiceCategories } from '@/hooks/data/useListServiceCategories';

type ServiceFormProps = {
  form: UseFormReturn<z.infer<typeof serviceFormSchema>>;
  onSubmit: (values: z.infer<typeof serviceFormSchema>) => void;
  onCancel: () => void;
};

const ServiceForm = ({ form, onSubmit, onCancel }: ServiceFormProps) => {
  const { serviceCategories } = useListServiceCategories();

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
              <FormLabel>Tên dịch vụ</FormLabel>
              <FormControl>
                <Input
                  placeholder='Dịch vụ A'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='serviceCategoryId'
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
                  {serviceCategories?.map((category) => (
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
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Input
                  placeholder='Mô tả dịch vụ'
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

export default ServiceForm;

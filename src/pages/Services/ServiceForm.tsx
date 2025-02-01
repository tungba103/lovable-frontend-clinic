import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { serviceFormSchema } from '@/validations/ServiceSchema';
import { z } from 'zod';
import { useListServiceCategories } from '@/hooks/data/useListServiceCategories';
import AsyncButton from '@/components/AsyncButton';

type ServiceFormProps = {
  form: UseFormReturn<z.infer<typeof serviceFormSchema>>;
  onSubmit: (values: z.infer<typeof serviceFormSchema>) => void;
  onCancel: () => void;
  isLoading: boolean;
};

const ServiceForm = ({ form, onSubmit, onCancel, isLoading }: ServiceFormProps) => {
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
                  type='text'
                  placeholder='100,000 VND'
                  {...field}
                  value={field.value ? `${field.value.toLocaleString('vi-VN')}` : ''}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^\d]/g, '');
                    const value = parseInt(rawValue, 10);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
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
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái</FormLabel>
              <FormControl>
                <select
                  className='w-full p-2 border rounded-md'
                  {...field}
                  value={field.value || ''}
                >
                  <option value=''>Chọn trạng thái</option>
                  <option value='ACTIVE'>Hoạt động</option>
                  <option value='INACTIVE'>Không hoạt động</option>
                </select>
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
          <AsyncButton
            isLoading={isLoading}
            onClick={() => form.handleSubmit(onSubmit)}
          >
            Lưu
          </AsyncButton>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;

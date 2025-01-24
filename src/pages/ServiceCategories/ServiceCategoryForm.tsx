import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { serviceCategoryFormSchema } from '@/validations/ServiceCategorySchema';
import { z } from 'zod';

type ServiceCategoryFormProps = {
  form: UseFormReturn<z.infer<typeof serviceCategoryFormSchema>>;
  onSubmit: (values: z.infer<typeof serviceCategoryFormSchema>) => void;
  onCancel: () => void;
};

const ServiceCategoryForm = ({ form, onSubmit, onCancel }: ServiceCategoryFormProps) => {
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
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input
                  placeholder='Danh mục A'
                  {...field}
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
                  placeholder='Mô tả danh mục'
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

export default ServiceCategoryForm;

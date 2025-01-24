import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { existingVisitFormSchema } from '@/validations/VisitSchema';
import { z } from 'zod';
import { useListCustomers } from '@/hooks/data/useListCustomers';

type ExistingCustomerVisitFormProps = {
  form: UseFormReturn<z.infer<typeof existingVisitFormSchema>>;
  onSubmit: (values: z.infer<typeof existingVisitFormSchema>) => void;
  onCancel: () => void;
};

const ExistingCustomerVisitForm = ({ form, onSubmit, onCancel }: ExistingCustomerVisitFormProps) => {
  const { customers } = useListCustomers();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='customerId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bệnh nhi</FormLabel>
              <FormControl>
                <select
                  className='w-full p-2 border rounded-md'
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  <option value=''>Chọn bệnh nhi</option>
                  {customers?.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name} - {customer.parentPhone}
                    </option>
                  ))}
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

export default ExistingCustomerVisitForm;

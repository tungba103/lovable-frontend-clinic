import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { visitFormSchema } from '@/validations/VisitSchema';
import { z } from 'zod';
import { useListCustomers } from '@/hooks/data/useListCustomers';

type VisitFormProps = {
  form: UseFormReturn<z.infer<typeof visitFormSchema>>;
  onSubmit: (values: z.infer<typeof visitFormSchema>) => void;
  onCancel: () => void;
};

const VisitForm = ({ form, onSubmit, onCancel }: VisitFormProps) => {
  const { customers } = useListCustomers();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
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
                  onChange={(e) => {
                    const customerId = Number(e.target.value);
                    field.onChange(customerId);
                    const customer = customers?.find((c) => c.id === customerId);
                    if (customer) {
                      form.setValue('customerId', customer.id);
                    }
                  }}
                >
                  <option value=''>Chọn bệnh nhi</option>
                  {customers?.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name}
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

export default VisitForm;

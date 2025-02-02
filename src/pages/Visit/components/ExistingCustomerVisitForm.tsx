import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { existingVisitFormSchema } from '@/validations/VisitSchema';
import { z } from 'zod';
import { useListCustomers } from '@/hooks/data/useListCustomers';
import AsyncButton from '@/components/AsyncButton';
import { Combobox } from '@/components/RHFInput/Combobox';
import { Customer } from '@/types/api/customer';

type ExistingCustomerVisitFormProps = {
  form: UseFormReturn<z.infer<typeof existingVisitFormSchema>>;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof existingVisitFormSchema>) => void;
  onCancel: () => void;
};

const ExistingCustomerVisitForm = ({ form, onSubmit, onCancel, isLoading }: ExistingCustomerVisitFormProps) => {
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
                <Combobox
                  useListData={useListCustomers}
                  mapDataToItems={(customers: Customer[]) =>
                    customers?.map((customer: Customer) => {
                      return {
                        key: customer.id.toString(),
                        value: customer.id,
                        label: `${customer.name} - ${customer.parentPhone}`,
                      };
                    })
                  }
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Chọn bệnh nhi'
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

export default ExistingCustomerVisitForm;

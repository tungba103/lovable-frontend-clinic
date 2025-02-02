import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { newCustomerVisitFormSchema } from '@/validations/VisitSchema';
import { z } from 'zod';
import AsyncButton from '@/components/AsyncButton';

type NewCustomerVisitFormProps = {
  form: UseFormReturn<z.infer<typeof newCustomerVisitFormSchema>>;
  onSubmit: (values: z.infer<typeof newCustomerVisitFormSchema>) => void;
  onCancel: () => void;
  isLoading: boolean;
};

const NewCustomerVisitForm = ({ form, onSubmit, onCancel, isLoading }: NewCustomerVisitFormProps) => {
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
              <FormLabel>Họ và tên bệnh nhi</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nguyễn Văn A'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <select
                  className='w-full p-2 border rounded-md'
                  {...field}
                >
                  <option value='MALE'>Nam</option>
                  <option value='FEMALE'>Nữ</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  type='date'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='parentName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ tên phụ huynh</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nguyễn Văn B'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='parentPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder='0965899821'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  placeholder='Tổ 1 phường Chiềng Sinh, TP Sơn La'
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

export default NewCustomerVisitForm;

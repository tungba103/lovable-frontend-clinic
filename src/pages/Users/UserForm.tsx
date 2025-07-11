import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { userFormSchema } from '@/validations/UserSchema';
import AsyncButton from '@/components/AsyncButton';

interface UserFormProps {
  form: UseFormReturn<z.infer<typeof userFormSchema>>;
  onSubmit: (values: z.infer<typeof userFormSchema>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const UserForm = ({ form, onSubmit, onCancel, isLoading }: UserFormProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
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

export default UserForm;

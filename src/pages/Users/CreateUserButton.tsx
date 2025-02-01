import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserMutation } from '@/hooks/data/useUserMutation';
import { CreateUserRequest } from '@/types/api/user';
import { useState } from 'react';
import UserForm from './UserForm';
import { useForm } from 'react-hook-form';
import { userFormSchema } from '@/validations/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const CreateUserButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useUserMutation();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      name: '',
      password: '',
    },
  });

  const handleSubmit = (data: CreateUserRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>Thêm người dùng mới</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Thêm người dùng mới
          </DialogTitle>
          <UserForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserButton;

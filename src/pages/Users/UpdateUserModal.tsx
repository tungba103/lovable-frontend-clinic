import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PenLine } from 'lucide-react';
import { useUserMutation } from '@/hooks/data/useUserMutation';
import { User, UpdateUserRequest } from '@/types/api/user';
import { useState } from 'react';
import UserForm from './UserForm';
import { useForm } from 'react-hook-form';
import { userFormSchema } from '@/validations/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface IProps {
  user: User;
}

const UpdateUserModal = ({ user }: IProps) => {
  const [open, setOpen] = useState(false);
  const { updateMutation } = useUserMutation();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      password: '',
    },
  });

  const handleSubmit = (data: UpdateUserRequest) => {
    updateMutation.mutate(
      { userId: user.id, data },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <div className='p-2 w-fit rounded-full hover:bg-gray-200 group'>
          <PenLine className='w-4 h-4 text-gray-500 group-hover:text-gray-900' />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Cập nhật thông tin người dùng
          </DialogTitle>
          <UserForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            isLoading={updateMutation.isPending}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;

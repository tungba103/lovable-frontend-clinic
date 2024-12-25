import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const SignIn = () => {
  const { loginWithUsername } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loginWithUsername(
      { username, password },
      () => toast({ title: 'Đăng nhập thành công', variant: 'default' }),
      () => {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
        toast({ title: 'Đăng nhập thất bại', variant: 'destructive' });
      }
    );
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md'>
        <div className='bg-white px-8 py-12 shadow-lg rounded-lg'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>Đăng nhập</h2>

          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'
              >
                Tên đăng nhập
              </label>
              <Input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='mt-1'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Mật khẩu
              </label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mt-1'
              />
            </div>

            {error && <div className='text-red-500 text-sm text-center'>{error}</div>}

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

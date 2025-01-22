import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full bg-white'>
      <div className='flex justify-between items-center p-4 outline outline-1 outline-slate-100'>
        <div className='text-lg font-base'>Xin chào Thảo Nhi 🖐</div>

        <Popover>
          <PopoverTrigger asChild>
            <Avatar className='cursor-pointer'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className='w-fit mr-4 rounded-xl'>
            <p
              className='text-base font-medium cursor-pointer w-fit mr-4 text-gray-500 hover:text-gray-900'
              onClick={() => {
                logout();
                navigate('/sign-in');
              }}
            >
              Đăng xuất
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;

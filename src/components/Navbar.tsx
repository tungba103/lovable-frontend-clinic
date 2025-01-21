import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <div className='w-full bg-white'>
      <div className='flex justify-between items-center p-4 outline outline-1 outline-slate-100'>
        <div className='text-lg font-base'>Xin chào Thảo Nhi 🖐</div>
        <Avatar className='cursor-pointer'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;

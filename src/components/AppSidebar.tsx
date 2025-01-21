import { CalendarPlus, Home, PillIcon, StethoscopeIcon, UserCog, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const items = [
  {
    title: 'Trang chủ',
    url: '/',
    icon: Home,
  },
  {
    title: 'Lượt khám',
    url: '/visits',
    icon: CalendarPlus,
  },
  {
    title: 'Khách hàng',
    url: '/customers',
    icon: Users,
  },
  {
    title: 'Sản phẩm',
    url: '/products',
    icon: PillIcon,
  },
  {
    title: 'Thủ thuật',
    url: '/products',
    icon: StethoscopeIcon,
  },
];

const AppSidebar = () => {
  // const { open, setOpen } = useSidebar();
  return (
    <Sidebar className='p-2'>
      <SidebarContent className='bg-white'>
        <Link
          to='/'
          className='flex items-end justify-start mx-2 mt-2 cursor-pointer'
        >
          <Avatar className='cursor-pointer'>
            <AvatarImage src='https://cdn-icons-png.freepik.com/512/16848/16848858.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className='text-lg font-bold'>PK Thảo Nhi</p>
        </Link>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* <SidebarMenuButton
              size='lg'
              onClick={() => setOpen(!open)}
            >
              <div>
                <AlignJustify size={24} />
              </div>
            </SidebarMenuButton> */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size='lg'
                    asChild
                    className=' text-slate-600 hover:text-blue-500 hover:bg-blue-100'
                  >
                    <Link to={item.url}>
                      <div className='pr-2'>
                        <item.icon />
                      </div>
                      <span className='text-base font-medium'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-white'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
              className=' text-slate-600 hover:text-blue-500 hover:bg-blue-100'
            >
              <Link to='/users'>
                <div className='pr-2'>
                  <UserCog />
                </div>
                <span className='text-base font-medium'>Quản lý người dùng</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

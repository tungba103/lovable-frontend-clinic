import { CalendarPlus, ChevronDown, ChevronRight, Home, PillIcon, StethoscopeIcon, UserCog, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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
import { useState } from 'react';

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
    title: 'Thuốc',
    url: '/products-root',
    icon: PillIcon,
    subItems: [
      {
        title: 'Danh sách thuốc',
        url: '/products',
      },
      {
        title: 'Danh mục thuốc',
        url: '/product-categories',
      },
    ],
  },
  {
    title: 'Thủ thuật',
    url: '/services-root',
    icon: StethoscopeIcon,
    subItems: [
      {
        title: 'Danh sách thủ thuật',
        url: '/services',
      },
      {
        title: 'Danh mục thủ thuật',
        url: '/service-categories',
      },
    ],
  },
];

const AppSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };

  const isActiveRoute = (url: string) => {
    return location.pathname === url;
  };

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
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size='lg'
                    asChild
                    className={`text-slate-600 hover:text-blue-500 hover:bg-blue-100 ${
                      isActiveRoute(item.url) ? 'bg-blue-100 text-blue-500' : ''
                    }`}
                    onClick={
                      item.subItems
                        ? (e) => {
                            e.preventDefault();
                            toggleItem(item.title);
                          }
                        : undefined
                    }
                  >
                    <Link to={item.url}>
                      <div className='pr-2'>
                        <item.icon />
                      </div>
                      <span className='text-base font-medium'>{item.title}</span>
                      {item.subItems && (
                        <div className='ml-auto'>
                          {expandedItems.includes(item.title) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && expandedItems.includes(item.title) && (
                    <div className='ml-8 mt-1'>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuButton
                          key={subItem.title}
                          size='lg'
                          asChild
                          className={`text-slate-600 hover:text-blue-500 hover:bg-blue-100 ${
                            isActiveRoute(subItem.url) ? 'bg-blue-100 text-blue-500' : ''
                          }`}
                        >
                          <Link to={subItem.url}>
                            <span className='text-base font-medium'>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
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
              className={`text-slate-600 hover:text-blue-500 hover:bg-blue-100 ${
                isActiveRoute('/users') ? 'bg-blue-100 text-blue-500' : ''
              }`}
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

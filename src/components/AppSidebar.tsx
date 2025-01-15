import { AlignJustify, Calendar, Home, Settings, Users } from 'lucide-react';
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
  useSidebar,
} from './ui/sidebar';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Visits',
    url: '/visits',
    icon: Calendar,
  },
  {
    title: 'Customers',
    url: '/customers',
    icon: Users,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { open, setOpen } = useSidebar();
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className='text-lg font-bold text-black'>Lovable Clinic</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenuButton onClick={() => setOpen(!open)}>
              <AlignJustify />
            </SidebarMenuButton>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className='h-4 w-4' />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to='/users'>
                <Users className='h-4 w-4' />
                <span>Users and Roles</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

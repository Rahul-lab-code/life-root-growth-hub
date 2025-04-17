
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  Award, 
  BarChart3, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  Leaf, 
  Brain, 
  Heart,
  Smile,
  Menu
} from 'lucide-react';
import AppLogo from './AppLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const AppSidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useSidebar();

  if (!currentUser) return null;

  const isActive = (path: string) => location.pathname.includes(path);

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const getMenuItems = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return [
          { icon: Home, title: 'Dashboard', path: '/admin/dashboard' },
          { icon: Users, title: 'Users', path: '/admin/users' },
          { icon: Award, title: 'Missions', path: '/admin/missions' },
          { icon: BarChart3, title: 'Reports', path: '/admin/reports' },
          { icon: Settings, title: 'Settings', path: '/admin/settings' }
        ];
      case 'mentor':
        return [
          { icon: Home, title: 'Dashboard', path: '/mentor/dashboard' },
          { icon: Users, title: 'Students', path: '/mentor/students' },
          { icon: Award, title: 'Missions', path: '/mentor/missions' },
          { icon: MessageSquare, title: 'Messages', path: '/mentor/messages' },
          { icon: User, title: 'Profile', path: '/mentor/profile' }
        ];
      case 'student':
        return [
          { icon: Home, title: 'Dashboard', path: '/student/dashboard' },
          { icon: Leaf, title: 'Eco Missions', path: '/student/missions/eco' },
          { icon: Brain, title: 'EQ Missions', path: '/student/missions/eq' },
          { icon: Heart, title: 'Value Missions', path: '/student/missions/values' },
          { icon: Smile, title: 'Prakriti Assessment', path: '/student/prakriti-assessment' },
          { icon: MessageSquare, title: 'Soul Circles', path: '/student/soul-circles' },
          { icon: User, title: 'My Profile', path: '/student/profile' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(currentUser.role);

  return (
    <Sidebar>
      <SidebarHeader className="px-3">
        <AppLogo variant="sidebar" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    className={isActive(item.path) ? 'bg-sidebar-accent' : ''}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={currentUser.profileImg} />
            <AvatarFallback className="bg-liferoot-green text-white">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{currentUser.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
          </div>
        </div>
        <Button onClick={() => logout()} variant="outline" size="sm" className="w-full flex gap-2">
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </SidebarFooter>
      
      <SidebarTrigger className="absolute right-0 top-4 translate-x-1/2 bg-background border shadow-sm rounded-full p-1.5">
        <span className="sr-only">Toggle Sidebar</span>
      </SidebarTrigger>
    </Sidebar>
  );
};

export default AppSidebar;

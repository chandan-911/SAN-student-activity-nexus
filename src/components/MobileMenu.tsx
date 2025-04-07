
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Upload, 
  FileText, 
  Mail, 
  Award, 
  GraduationCap, 
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border pb-2">
          <DrawerTitle className="flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary mr-2" />
            Student Activity Nexus
          </DrawerTitle>
        </DrawerHeader>
        
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            <li>
              <DrawerClose asChild>
                <Link to="/dashboard" 
                  className={`flex items-center p-3 rounded-md transition-colors ${isActiveRoute('/dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                >
                  <Home className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </DrawerClose>
            </li>
            <li>
              <DrawerClose asChild>
                <Link to="/upload" 
                  className={`flex items-center p-3 rounded-md transition-colors ${isActiveRoute('/upload') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                >
                  <Upload className="h-5 w-5 mr-3" />
                  Upload Docs
                </Link>
              </DrawerClose>
            </li>
            <li>
              <DrawerClose asChild>
                <Link to="/certificates" 
                  className={`flex items-center p-3 rounded-md transition-colors ${isActiveRoute('/certificates') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  View Docs
                </Link>
              </DrawerClose>
            </li>
            
            <li className="pt-2 border-t border-border mt-2">
              <a 
                href="https://mail.gndec.ac.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-3 rounded-md transition-colors hover:bg-secondary"
              >
                <Mail className="h-5 w-5 mr-3" />
                GNDEC Mail
              </a>
            </li>
            <li>
              <a 
                href="https://academics.gndec.ac.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-3 rounded-md transition-colors hover:bg-secondary"
              >
                <GraduationCap className="h-5 w-5 mr-3" />
                Academic Portal
              </a>
            </li>
            <li>
              <a 
                href="https://guru.gndec.ac.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-3 rounded-md transition-colors hover:bg-secondary"
              >
                <Award className="h-5 w-5 mr-3" />
                Guru Portal
              </a>
            </li>
            
            <li className="pt-3 border-t border-border mt-3">
              <Button 
                variant="destructive" 
                className="w-full justify-start" 
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;

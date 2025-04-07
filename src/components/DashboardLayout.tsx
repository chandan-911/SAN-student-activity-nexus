
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from './MobileMenu';
import { 
  Home, 
  Upload, 
  FileText, 
  Mail, 
  Award, 
  GraduationCap, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {isMobile && <MobileMenu />}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold hidden sm:inline">Student Activity Nexus</span>
              <span className="text-xl font-bold sm:hidden">SAN</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="animate-fade-in">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <div className="text-sm text-muted-foreground hidden sm:block">
              {user?.name || user?.rollNumber}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout} 
              className="text-destructive hidden sm:flex"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1 container py-4">
        {/* Sidebar */}
        <aside className="w-56 mr-8 hidden md:block">
          <nav className="space-y-1 sticky top-20">
            <Link 
              to="/dashboard" 
              className={`flex items-center nav-link ${isActiveRoute('/dashboard') ? 'active' : ''} hover-scale`}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link 
              to="/upload" 
              className={`flex items-center nav-link ${isActiveRoute('/upload') ? 'active' : ''} hover-scale`}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Docs
            </Link>
            <Link 
              to="/certificates" 
              className={`flex items-center nav-link ${isActiveRoute('/certificates') ? 'active' : ''} hover-scale`}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Docs
            </Link>
            <hr className="my-3 border-border" />
            <a 
              href="https://mail.gndec.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center nav-link hover-scale"
            >
              <Mail className="h-4 w-4 mr-2" />
              GNDEC Mail
            </a>
            <a 
              href="https://academics.gndec.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center nav-link hover-scale"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Academic Portal
            </a>
            <a 
              href="https://guru.gndec.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center nav-link hover-scale"
            >
              <Award className="h-4 w-4 mr-2" />
              Guru Portal
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        &copy; 2025 Student Activity Nexus GNDEC. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;

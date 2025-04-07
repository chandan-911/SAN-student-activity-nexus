
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
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

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Student Activity Nexus</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {user?.name || user?.rollNumber}
            </div>
            
            <Button variant="ghost" size="sm" onClick={logout} className="text-destructive">
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
            <Link to="/dashboard" className={`flex items-center nav-link ${isActiveRoute('/dashboard') ? 'active' : ''}`}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link to="/upload" className={`flex items-center nav-link ${isActiveRoute('/upload') ? 'active' : ''}`}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Docs
            </Link>
            <Link to="/certificates" className={`flex items-center nav-link ${isActiveRoute('/certificates') ? 'active' : ''}`}>
              <FileText className="h-4 w-4 mr-2" />
              View Docs
            </Link>
            <hr className="my-3 border-border" />
            <a 
              href="https://mail.gndec.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center nav-link"
            >
              <Mail className="h-4 w-4 mr-2" />
              GNDEC Mail
            </a>
            <a 
              href="https://academics.gndec.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center nav-link"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Academic Portal
            </a>
            <a 
              href="https://guru.gndec.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center nav-link"
            >
              <Award className="h-4 w-4 mr-2" />
              Guru Portal
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
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

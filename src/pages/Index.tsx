
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    rollNumber: '',
    academicPassword: '',
    email: '',
    emailPassword: '',
  });

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(formData);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container px-4 md:px-6 max-w-md">
        <Card className="animate-fade-up">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Student Login</CardTitle>
            <CardDescription>
              Enter your credentials to access Student Activity Nexus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Class Roll Number</Label>
                <Input 
                  id="rollNumber" 
                  name="rollNumber"
                  placeholder="Enter your roll number" 
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicPassword">Academic Portal Password</Label>
                <Input 
                  id="academicPassword" 
                  name="academicPassword"
                  type="password" 
                  placeholder="Enter your academic portal password" 
                  value={formData.academicPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPassword">Email Password</Label>
                <Input 
                  id="emailPassword" 
                  name="emailPassword"
                  type="password" 
                  placeholder="Enter your email password" 
                  value={formData.emailPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            This portal integrates all your college activities into one place
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;

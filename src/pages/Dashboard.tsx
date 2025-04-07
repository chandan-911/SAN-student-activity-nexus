
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getActivityStats, getActivities, Activity } from '@/services/activityService';
import { FileText, Award, GraduationCap, Users, BarChart, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    categories: {
      academic: 0,
      sports: 0,
      cultural: 0,
      technical: 0,
      other: 0
    }
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const activityStats = getActivityStats();
    setStats(activityStats);
    
    // Get most recent 3 activities
    const activities = getActivities();
    const sorted = [...activities].sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    setRecentActivities(sorted.slice(0, 3));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || user?.rollNumber}! Here's an overview of your activities.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Academic Activities</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories.academic}</div>
              <p className="text-xs text-muted-foreground">
                Academic achievements
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sports Activities</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories.sports}</div>
              <p className="text-xs text-muted-foreground">
                Sports achievements
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cultural Activities</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories.cultural}</div>
              <p className="text-xs text-muted-foreground">
                Cultural achievements
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity + Quick Links */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 card-hover">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Your most recently uploaded certificates and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">No activities uploaded yet.</p>
                  <Link to="/upload" className="text-primary text-sm block mt-2">
                    Upload your first activity
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link to="/certificates" className="text-primary text-sm">
                View all activities
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="col-span-3 card-hover">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>
                Access important college resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <a 
                href="https://academics.gndec.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Academic Portal</p>
                  <p className="text-xs text-muted-foreground">View your academic results</p>
                </div>
              </a>
              
              <a 
                href="https://mail.gndec.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">GNDEC Mail</p>
                  <p className="text-xs text-muted-foreground">Access your college email</p>
                </div>
              </a>
              
              <a 
                href="https://guru.gndec.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Guru Portal</p>
                  <p className="text-xs text-muted-foreground">Access e-learning resources</p>
                </div>
              </a>
              
              <Link
                to="/upload"
                className="flex items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded mr-3">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Upload New Activity</p>
                  <p className="text-xs text-muted-foreground">Add a new certificate or achievement</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

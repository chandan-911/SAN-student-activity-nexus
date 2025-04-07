
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, getActivities, ActivityCategory } from '@/services/activityService';
import { Calendar, Search, Filter, FileText } from 'lucide-react';

const Certificates = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ActivityCategory | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');

  useEffect(() => {
    const fetchedActivities = getActivities();
    setActivities(fetchedActivities);
    setFilteredActivities(fetchedActivities);
  }, []);

  // Apply filters when search term or category changes
  useEffect(() => {
    let filtered = activities;
    
    // Filter by category if not 'all'
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(activity => activity.category === categoryFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.activity.toLowerCase().includes(term) || 
        activity.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredActivities(filtered);
  }, [activities, searchTerm, categoryFilter]);

  const handleTabChange = (value: string) => {
    setSelectedCategory(value as ActivityCategory | 'all');
    setCategoryFilter(value as ActivityCategory | 'all');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Your Certificates</h1>
          <p className="text-muted-foreground">
            View and manage all your uploaded certificates and achievements
          </p>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search certificates..." 
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={categoryFilter} onValueChange={(value: string) => setCategoryFilter(value as ActivityCategory | 'all')}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs and Content */}
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedCategory} className="mt-0">
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map(activity => (
                  <Card key={activity.id} className="card-hover overflow-hidden">
                    <div className="aspect-video relative">
                      <img 
                        src={activity.fileData} 
                        alt={activity.activity} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{activity.activity}</CardTitle>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                          {activity.category}
                        </span>
                      </div>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No certificates found</h3>
                <p className="text-muted-foreground mt-1">
                  {activities.length === 0 
                    ? "You haven't uploaded any certificates yet." 
                    : "No certificates match your search criteria."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Certificates;


export type ActivityCategory = 'academic' | 'sports' | 'cultural' | 'technical' | 'other';

export interface Activity {
  id: string;
  activity: string;
  description: string;
  date: string;
  category: ActivityCategory;
  fileName: string;
  fileType: string;
  fileData: string;
  uploadedAt: string;
}

// Get all activities from localStorage
export const getActivities = (): Activity[] => {
  try {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
  } catch (error) {
    console.error('Error getting activities from localStorage:', error);
    return [];
  }
};

// Add a new activity to localStorage
export const addActivity = (activity: Omit<Activity, 'id'>): Activity => {
  try {
    const activities = getActivities();
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
    };
    
    activities.push(newActivity);
    localStorage.setItem('activities', JSON.stringify(activities));
    
    return newActivity;
  } catch (error) {
    console.error('Error adding activity to localStorage:', error);
    throw new Error('Failed to add activity');
  }
};

// Get activities by category
export const getActivitiesByCategory = (category: ActivityCategory): Activity[] => {
  const activities = getActivities();
  return activities.filter(activity => activity.category === category);
};

// Get activity statistics
export const getActivityStats = () => {
  const activities = getActivities();
  
  const categories: Record<ActivityCategory, number> = {
    academic: 0,
    sports: 0,
    cultural: 0,
    technical: 0,
    other: 0
  };
  
  activities.forEach(activity => {
    categories[activity.category]++;
  });
  
  return {
    total: activities.length,
    categories
  };
};

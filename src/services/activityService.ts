
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

// Generate user-specific storage key
const getUserStorageKey = (userIdentifier?: string) => {
  // Get current user from localStorage if not provided
  if (!userIdentifier) {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    const userData = JSON.parse(user);
    userIdentifier = userData.rollNumber;
  }
  
  return `activities_${userIdentifier}`;
};

// Get all activities from localStorage for the current user
export const getActivities = (): Activity[] => {
  try {
    const storageKey = getUserStorageKey();
    if (!storageKey) {
      console.error('No user is logged in');
      return [];
    }
    
    const activities = localStorage.getItem(storageKey);
    return activities ? JSON.parse(activities) : [];
  } catch (error) {
    console.error('Error getting activities from localStorage:', error);
    return [];
  }
};

// Add a new activity to localStorage for the current user
export const addActivity = (activity: Omit<Activity, 'id'>): Activity => {
  try {
    const storageKey = getUserStorageKey();
    if (!storageKey) {
      throw new Error('No user is logged in');
    }
    
    const activities = getActivities();
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
    };
    
    activities.push(newActivity);
    localStorage.setItem(storageKey, JSON.stringify(activities));
    
    return newActivity;
  } catch (error) {
    console.error('Error adding activity to localStorage:', error);
    throw new Error('Failed to add activity');
  }
};

// Get activities by category for the current user
export const getActivitiesByCategory = (category: ActivityCategory): Activity[] => {
  const activities = getActivities();
  return activities.filter(activity => activity.category === category);
};

// Get activity statistics for the current user
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

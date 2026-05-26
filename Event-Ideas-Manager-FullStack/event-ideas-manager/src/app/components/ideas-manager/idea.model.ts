export interface Idea {
  id: string;       
  name: string;       
  activityType: string;
  targetAudience: string; 
  duration: number;   
  status: 'ממתין לאישור' | 'מאושר' | 'נדחה'; 
}
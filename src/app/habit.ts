export interface HabitInfo {
    id: number;
    name: string;
    description?: string[];

    tags?: string[];

    timesperinstance: number;

    startdate?: Date;
    ends?: boolean;
    enddate?: Date;
    
    frequency?: 'daily' | 'weekly' | 'monthly';
    // Implement later
    everyxdays?: number; // e.g., every 2 days, every 3 weeks
    daysofweek?: string[]; // e.g., ['Monday', 'Wednesday', 'Friday']
    everyxweeks?: number; // e.g., every 2 weeks
    daysofmonth?: number[]; // e.g., [1, 15, 30]
    everyxmonths?: number; // e.g., every 2 months

    

    isactive?: boolean;
}

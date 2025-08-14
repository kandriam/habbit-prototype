export interface HabitInfo {
    id: number;
    name: string;
    description?: string[];

    tags?: string[];

    timesperinstance: number;

    startdate?: Date;
    enddate?: Date;
    ends?: boolean;
    
    frequency?: 'daily' | 'weekly' | 'monthly';
    // Implement later
    everyxdays?: number; // e.g., every 2 days, every 3 weeks
    everyxweeks?: number; // e.g., every 2 weeks
    daysofweek?: string[]; // e.g., ['Monday', 'Wednesday', 'Friday']
    everyxmonths?: number; // e.g., every 2 months
    daysofmonth?: number[]; // e.g., [1, 15, 30]

    

    isactive?: boolean;
}

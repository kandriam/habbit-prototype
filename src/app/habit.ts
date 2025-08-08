export interface HabitInfo {
    id: number;
    name: string;
    tags: string[];
    timesperinstance: number;
    startdate?: Date;
    enddate?: Date;
}

export interface HabitInfo {
    id: number;
    name: string;
    tags: string[];
    timesperday: number;
    startdate?: Date;
    enddate?: Date;
}

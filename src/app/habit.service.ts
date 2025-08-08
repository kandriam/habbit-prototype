import { Injectable } from '@angular/core';
import { HabitInfo } from './habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  
  habitList: HabitInfo[] = [
    {
      id: 1,
      name: 'Drink water',
      tags: ['Health', 'Hydration'],
      timesperinstance: 1,
    },
    {
      id: 2,
      name: 'Brush teeth',
      tags: ['Hygene'],
      timesperinstance: 2,
    },
    {
      id: 3,
      name: 'Salt gargle',
      tags: ['Hygene'],
      timesperinstance: 1,
    },
  ];

  getAllHabits(): HabitInfo[] {
    return this.habitList;
  }
  getHabitsById(id: number): HabitInfo | undefined {
    return this.habitList.find((housingLocation) => housingLocation.id === id);
  }
}

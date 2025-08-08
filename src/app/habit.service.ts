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
    {
      id: 4,
      name: 'Teeth strip',
      tags: ['Hygene'],
      timesperinstance: 1,
      frequency: 'daily',
      description: 'Use teeth strip to whiten teeth. 1. Apply the strip to your teeth. 2. Wait for 30 minutes. 3. Remove the strip and rinse/brush your mouth.',
    },
    {
      id: 5,
      name: 'Go to LC gym',
      tags: ['Health', 'Fitness'],
      timesperinstance: 5,
      frequency: 'weekly',
      description: 'Go to the gym and exercise. 1. Warm up for 10 minutes. 2. Treadmill. 3. Do strength training for 30 minutes. 4. Cool down for 10 minutes.',
    }
  ];

  getAllHabits(): HabitInfo[] {
    return this.habitList;
  }
  getHabitsById(id: number): HabitInfo | undefined {
    return this.habitList.find((housingLocation) => housingLocation.id === id);
  }
}

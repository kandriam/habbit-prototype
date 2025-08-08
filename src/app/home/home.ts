import { Component } from '@angular/core';
import { HabitInfo } from '../habit';
import { Habit } from '../habit/habit';

@Component({
  selector: 'app-home',
  imports: [Habit],
  template: `
    <section>
      <h1>Calendar</h1>
    </section>
    <section>
      <form>
        <input type="text" placeholder="Filter by tag" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for(habit of habitList; track $index) {
        <app-habit [habit]="habit"></app-habit>
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})

export class Home {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  habitList: HabitInfo[] = [
    {
      id: 1,
      name: 'Drink water',
      tags: ['Health', 'Hydration'],
      timesperday: 1,
    },
    {
      id: 2,
      name: 'Brush teeth',
      tags: ['Hygene'],
      timesperday: 2,
    },
    {
      id: 3,
      name: 'Salt gargle',
      tags: ['Hygene'],
      timesperday: 1,
    },
  ];
}


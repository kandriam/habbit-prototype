import { Component, inject } from '@angular/core';
import { HabitInfo } from '../habit';
import { Habit } from '../habit/habit';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-home',
  imports: [Habit],
  template: `
    <article>
      <h2>Calendar</h2>
    </article>
    <aside style="float: right; width: 50%;">
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
    </aside>
  `,
  styleUrls: ['../../styles.css', './home.css'],
})

export class Home {
  habitList: HabitInfo[] = [];
  habitService: HabitService = inject(HabitService);
  constructor() {
    this.habitList = this.habitService.getAllHabits();
  }

}


import { Component, input } from '@angular/core';
import { HabitInfo } from '../habit';

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [],
  template: `
    <section class="habit-display">
      <h2 class="habit-display-heading">{{ habit().name }}</h2>
      <p class="habit-display-tags">{{ habit().tags }}</p>
    </section>
  `,
  styleUrls: ['./habit.css'],
})
export class Habit {
  habit = input.required<HabitInfo>()
}

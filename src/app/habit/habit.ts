import { Component, input } from '@angular/core';
import { HabitInfo } from '../habit';

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [],
  template: `
    <section class="habit-display">
      <h2 class="habit-display-heading">{{ habit().name }}</h2>
      @for(tag of habit().tags; track $index) {
        <a class="habit-display-tags" href="#">{{ tag }}</a>
      }
    </section>
  `,
  styleUrls: ['./habit.css'],
})
export class Habit {
  habit = input.required<HabitInfo>()
}

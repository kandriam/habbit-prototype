import { Component, input } from '@angular/core';
import { HabitInfo } from '../habit';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <section class="habit-display">
      <h2 class="habit-display-heading">{{ habit().name }}</h2>
      <a [routerLink]="['/details', habit().id]">Learn More</a>
      <br>
      <div>
      @for(tag of habit().tags; track $index) {
        <a class="habit-display-tags" href="#">{{ tag }}</a>
      }
      </div>
    </section>
  `,
  styleUrls: ['./habit.css'],
})
export class Habit {
  habit = input.required<HabitInfo>()
}

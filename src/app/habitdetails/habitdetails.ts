import {Component, inject} from '@angular/core';
import { RouterLink, RouterOutlet, ActivatedRoute} from '@angular/router';
import {HabitService} from '../habit.service';
import {HabitInfo} from '../habit';

@Component({
  selector: 'app-habitdetails',
  imports: [RouterLink, RouterOutlet],
  template: `
    <article class="habit-details">
      <div style="display: flex; justify-content: space-between;">
        <h1>{{habit?.name}}</h1>
        <button class="primary" [routerLink]="['/']">Back</button>
      </div>
      <section class="habit-details-section">
        {{ habit?.timesperinstance }} time per day
      </section>

      @if (habit?.description) {
        <section class="habit-details-section">
          <p>{{ habit?.description }}</p>
        </section>
      }

      <section class="habit-details-section">
        @for (tag of habit?.tags; track $index) {
          <a class="habit-tags" href="#">{{ tag }}</a>
        }
      </section>
      
    </article>
  `,
  styleUrls: [ '../../styles.css', './habitdetails.css'],
})

export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitService: HabitService = inject(HabitService);
  habit: HabitInfo | undefined;
  // habitId = -1;


  constructor() {
    const habitId = Number(this.route.snapshot.params['id']);
    this.habit = this.habitService.getHabitsById(habitId);
  }
 }

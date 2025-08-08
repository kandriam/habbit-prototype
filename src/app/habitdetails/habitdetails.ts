import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HabitService} from '../habit.service';
import {HabitInfo} from '../habit';

@Component({
  selector: 'app-habitdetails',
  imports: [],
  template: `
    <article class="habit-details">
      <h1>{{habit?.name}}</h1>
      <section class="habit-details-section">
        {{ habit?.timesperinstance }} time per day
      </section>
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

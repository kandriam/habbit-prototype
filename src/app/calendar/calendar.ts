import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habit } from '../habit/habit';
import { HabitService } from '../habit.service';
import { HabitInfo } from '../habit';

@Component({
  selector: 'app-calendar',
  imports: [],
  template: `
    <table class="calendar">
      <tr>
        <th colspan=13> {{habit?.name}} </th>
      </tr>
      <tr>
        <th></th>
        @for (month of months; track month) {
          <th class="calen-month">{{month.slice(0,3)}}</th>
        }
      </tr>
      @for(n of dates; track n) {
        <tr>
        <td class="calen-date">{{ n }}</td>
        @for (month of months; track month) {
          <td>
            <input type="checkbox">
          </td>
        }
        </tr>
      }
    </table>
    `,
  styleUrls: ['../../styles.css', './calendar.css'],
})
export class Calendar {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitService: HabitService = inject(HabitService);
  habit: HabitInfo | undefined;
  habitId: number;
  dates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  constructor() {
    this.habitId = Number(this.route.snapshot.params['id']);

    this.habitService.getHabitsById(this.habitId).then((habit) => {
      this.habit = habit;
    });
  }
}


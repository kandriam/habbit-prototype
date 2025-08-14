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
      @for(d of dates; track d) {
        <tr>
        <td class="calen-date">{{ d }}</td>
        @for (m of months; track m) {
          <td>
            <input type="checkbox" id={{m}}{{d}} (click)="dayChecked((m+d))">
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
  dates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  checkedDays: Map<string,boolean> = new Map();

  constructor() {
    this.habitId = Number(this.route.snapshot.params['id']);

    this.habitService.getHabitsById(this.habitId).then((habit) => {
      this.habit = habit;
    });
  }

  dayChecked(date: string) {
    var element = <HTMLInputElement> document.getElementById(date);
    var isChecked = element.checked;
    // console.log(date, isChecked)
    if (isChecked) {
      this.checkedDays.set(date, true);
    }
    else (
      this.checkedDays.set(date, false)
    )
    // console.log(this.checkedDays);
    console.log("Sent");
        
    // this.habitService.updateHabitCalendar(this.habitId, habitname, this.checkedDays);
    this.habitService.updateHabitCalendar(
      this.habitId,
      this.habit?.name ?? '',
      this.habit?.timesperinstance ?? 1,
      this.habit?.frequency ??'daily',
      this.habit?.description ?? [],
      this.habit?.tags ?? [],
      this.checkedDays);
  }
}


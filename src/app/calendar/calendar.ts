import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habit } from '../habit/habit';
import { HabitService } from '../habit.service';
import { HabitInfo } from '../habit';

@Component({
  selector: 'app-calendar',
  imports: [],
  template: `
    <div class="secondary-container">
      <table class="calendar">
        <tr>
          <th colspan=13 class="calendar-title">
            <a class = "secondary">⇦{{curryear-1}}</a>
            {{curryear}}
            <a class = "secondary">{{curryear+1}}⇨</a>
            <a class="primary" (click)="resetCalendar()">Reset</a>
          </th>
        </tr>

        <tr>
          <th></th>
          @for (month of months; track month) {
            <th class="calen-month">{{month.slice(0,3)}}</th>
          }
        </tr>
        @for(d of dates; track d) {
          <tr>
          <th class="calen-date">{{ d }}</th>
          @for (m of months; track m) {
            <td>
              <input type="checkbox" id={{m}}{{d}}{{curryear}} (click)="dayChecked((m+d+curryear))">
            </td>
          }
          </tr>
        }
      </table>
    </div>
    `,
  styleUrls: ['../../styles.css', './calendar.css'],
})

export class Calendar {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitService: HabitService = inject(HabitService);
  habit: HabitInfo | undefined;
  checkedDays: string[] = [];
  habitId: number;
  fulldate =  new Date();
  year = this.fulldate.getFullYear();
  month = this.fulldate.getMonth() + 1;
  date = this.fulldate.getDate();
  curryear = this.year;

  dates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor() {
    this.habitId = Number(this.route.snapshot.params['id']);

    this.habitService.getHabitsById(this.habitId).then((habit) => {
      this.habit = habit;
      this.loadcalendar();
    });
  }

  loadcalendar() {
    console.log("load");
    
    this.habit?.calendar?.forEach( date =>{
      this.checkedDays.push(date);
      document.getElementById(date)?.setAttribute("checked", "checked");
      }
    )
    let todaysdate = this.months[this.month] + this.date + this.year;
    const today = document.getElementById(todaysdate) as HTMLInputElement;
    today.classList.add("today");
  }

  dayChecked(date: string) {
    var checkbox = <HTMLInputElement> document.getElementById(date);
    var isChecked = checkbox.checked;
    if (!isChecked) {
      let index = this.checkedDays.indexOf(date);
      this.checkedDays.splice(index, 1);
    }
    else (
      this.checkedDays.push(date)
    )
        
    this.habitService.updateHabitCalendar(
      this.habitId,
      this.habit?.name ?? '',
      this.habit?.timesdone ?? 0,
      this.habit?.timesperinstance ?? 1,
      this.habit?.frequency ??'daily',
      this.habit?.description ?? [],
      this.habit?.tags ?? [],
      this.checkedDays);
  }

  resetCalendar() {
    this.checkedDays.forEach(date =>{
      // document.getElementById(date)?.removeAttribute('checked');
      let checkbox = document.getElementById(date) as HTMLInputElement;
      checkbox.checked = false;
      this.habitService.updateHabitCalendar(
        this.habitId,
        this.habit?.name ?? '',
        this.habit?.timesdone ?? 0,
        this.habit?.timesperinstance ?? 1,
        this.habit?.frequency ??'daily',
        this.habit?.description ?? [],
        this.habit?.tags ?? [],
        []);
        // window.location.reload();
    });
  }
}


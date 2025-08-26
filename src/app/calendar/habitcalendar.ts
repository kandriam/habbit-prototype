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
            <a class="secondary" (click)="toggleToday()">ToggleToday</a>
            <input type="number" id="year-input" value={{curryear}} (input)="searchYear()" min=1>
            <a class="secondary" (click)="resetCalendar()">Reset Calendar</a>
          </th>
        </tr>
        <tr>
          <th colspan=13 class="calendar-title">
            <a class="secondary" id="prevyear" (click)="changeYear(curryear-1)">{{curryear-1}}</a>
            <a class="primary" id="curryear" (click)="changeYear(year)">{{curryear}}</a>
            <a class="secondary" id="nextyear" (click)="changeYear(curryear+1)">{{curryear+1}}</a>
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
              <input type="checkbox" id={{m}}{{d}} (click)="dayChecked((m+d+curryear))">
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
  month = this.fulldate.getMonth();
  date = this.fulldate.getDate();
  curryear = this.year;

  dates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor() {
    this.habitId = Number(this.route.snapshot.params['id']);

    this.habitService.getHabitsById(this.habitId).then((habit) => {
      this.habit = habit;
      this.loadcalendar(this.year);
      if (habit?.calendar) {
        this.checkedDays = habit.calendar;
      }

      this.loadcalendar(this.year);
    });
  }

  loadcalendar(year: number) {
    console.log("load");
    
    this.habit?.calendar?.forEach( date =>{
      // let dateyear = date.slice(-4);
      if (date.slice(-4) == year.toString()) {
        let checkbox = document.getElementById(date.slice(0,-4)) as HTMLInputElement;
        checkbox.checked = true;
      }
      else {
        let checkbox = document.getElementById(date.slice(0,-4)) as HTMLInputElement;
        checkbox.checked = false;
      }
    });
    
    let todaycheckbox = document.getElementById(this.months[this.month]+this.date);
    if (this.curryear == this.year) {
      console.log("This year")
      todaycheckbox?.classList.add('today');
    } else {
      if (todaycheckbox?.classList.contains('today')) {
        todaycheckbox.classList.remove('today');
      }
    }
  }

  dayChecked(date: string) {
    // var checkbox = <HTMLInputElement> document.getElementById(date+this.curryear);
    let fulldate = date;
    console.log(fulldate);

    if ((this.checkedDays.includes(fulldate))) {
      let index = this.checkedDays.indexOf(date+this.curryear);
      this.checkedDays.splice(index, 1);
    }
    else {
      this.checkedDays.push(fulldate);
    }
    console.log(this.checkedDays);
        
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

  changeYear(year: number) {
    this.curryear = year;
    this.loadcalendar(year);
  }

  searchYear(){
    var yearinput = document.getElementById("year-input") as HTMLInputElement;
    console.log(yearinput.value);
    this.changeYear(Number(yearinput.value));
  }

  toggleToday() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let strdate = months[this.month] + this.date;
    console.log(strdate);
    const yeardisplay = document.getElementById("curryear");
    if (yeardisplay?.innerText.toString() == this.year.toString()) {
      console.log("today!")
      const date = document.getElementById(strdate) as HTMLInputElement;
      date.checked = !date.checked;
      this.dayChecked(strdate+this.year);
    }
  }

  resetCalendar() {
    console.log("resetting");
    // this.checkedDays.forEach(date =>{
      // document.getElementById(date)?.removeAttribute('checked');
      // let checkbox = document.getElementById(date) as HTMLInputElement;
      // checkbox.checked = false;
      // });
    this.habitService.updateHabitCalendar(
      this.habitId,
      this.habit?.name ?? '',
      this.habit?.timesdone ?? 0,
      this.habit?.timesperinstance ?? 1,
      this.habit?.frequency ??'daily',
      this.habit?.description ?? [],
      this.habit?.tags ?? [],
      []);
    this.checkedDays = [];
    window.location.reload();
    // this.loadcalendar(this.curryear);
    
  }
}


import { Component, input, inject } from '@angular/core';
import { HabitInfo } from '../habit';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <section [routerLink]="['/details', habit().id]" class="habit-thumbnail">
      <div class="thumbnail-section">
        <h3>{{ habit().name }}</h3>
        <div>
          <a class="primary" (click)="deleteHabit(habit().id)">Delete</a>
          <a [routerLink]="['/details', habit().id]" class="primary">Details</a>
        </div>
      </div>
      <div class="thumbnail-section">
        <div class="details-row">
          <a class="tertiary" (click)="toggleToday()">
            @if (habit().calendar?.includes(this.strdate)) {
              <input type="checkbox" id="toggle-{{habit().id}}" checked>
            } @else {
              <input type="checkbox" id="toggle-{{habit().id}}">
            }
          </a>
          <p>
          @if (habit().timesperinstance === 1) {
            {{ habit().timesperinstance }}
          } @else {
            {{ habit().timesperinstance }}
          }
          times {{ habit().frequency }} </p>
        </div>
      </div>
      <div class="thumbnail-section">
        @if (habit().timesperinstance != 1) {
          <div class="details-row">
            <label class="progress-text" id="progress-numerator-{{habit().id}}">{{habit().timesdone}}/{{habit().timesperinstance}}</label>
            <a class="secondary" (click)="changeTracker(habit().id, -1)">-</a>
            <input id="progress-tracker-{{habit().id}}" type="range" min=0 max={{habit().timesperinstance}} value={{habit().timesdone}} class="slider" (input)="updateTracker(habit().id)">
            <a class="secondary" (click)="changeTracker(habit().id, 1)">+</a>
            <a class="secondary" type="button" (click)="resetProgress(habit().id)">Reset</a>
          </div>
        }
      </div>
      <div class="tag-section">
      @for(tag of habit().tags; track $index) {
        <a class="habit-tags" (click)="searchByTag(tag)">{{ tag }}</a>
      }
      </div>
    </section>
  `,
  styleUrls: ['../../styles.css', './habit.css'],
})


export class Habit {
  habitService: HabitService = inject(HabitService);
  habit = input.required<HabitInfo>()

  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today = new Date();
  strdate = this.months[this.today.getMonth()] + this.today.getDate() + this.today.getFullYear();
  
  // Called by habit tag being clicked
  // Put tag into search bar and search it
  searchByTag(tag: string): void {
    event?.stopPropagation(); // I know event is deprecated, but I don't know an alternative
    const searchInput = document.getElementById('search-bar') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = tag;
      searchInput.dispatchEvent(new Event('input'));
    }
  }


  toggleToday() {
    console.log("Toggling");
    event?.stopPropagation();
    let habitdates = this.habit().calendar ?? [];
    console.log(this.strdate);
    let todayDone = habitdates?.includes(this.strdate) ?? false;
    console.log(todayDone);
    if (todayDone) {
      // remove
      let loc = this.habit().calendar?.indexOf(this.strdate);
      habitdates.splice(Number(loc), 1);
    }
    else {
      // add
      habitdates.push(this.strdate);
    }
    let checkbox = document.getElementById('toggle-'+this.habit().id) as HTMLInputElement;
    checkbox.checked = todayDone;
    this.updateToday(habitdates);
  }

  // Called by delete habit button  clicked
  // Deletes habit through habit.service
  deleteHabit(id: number) {
    console.log(`Deleting habit from home: ${id}`)
    this.habitService.deleteHabit(id);
    window.location.reload();
  }
  // Sets progress tracker slider back to 0
  resetProgress(id: number) {
    var slider = <HTMLInputElement> document.getElementById("progress-tracker-" + id);
    slider.value = "0";
    this.updateTracker(id); 
  }

  // Takes in num of type number
  // Incraments (or decraments) tracker by said amount
  changeTracker(id: number, num: number){
    event?.stopPropagation(); // I know event is deprecated, but I don't know an alternative
    var slider = <HTMLInputElement> document.getElementById("progress-tracker-" + id);
    slider.value = (Number(slider.value) + Number(num)).toString();
    this.updateTracker(id);
  }
  
  // Updates progress tracker's label to the appropriate amount completed
  // and updates database with approprate amount completed
  updateTracker(id: number) {
    var slider = <HTMLInputElement> document.getElementById("progress-tracker-" + id);
    var str: string = slider.value + "/" + this.habit().timesperinstance;
    (document.getElementById("progress-numerator-" + id) as HTMLImageElement).textContent = (str);
    this.habitService.updateProgress(
      this.habit().id,
      this.habit().name ?? '',
      Number(slider.value),
      this.habit().timesperinstance ?? 1,
      this.habit().frequency ??'daily',
      this.habit().description ?? [],
      this.habit().tags ?? [],
      this.habit().calendar ?? []);
  }

  updateToday(newCal: string[]) {
    this.habitService.updateProgress(
      this.habit().id,
      this.habit().name ?? '',
      this.habit().timesdone,
      this.habit().timesperinstance ?? 1,
      this.habit().frequency ??'daily',
      this.habit().description ?? [],
      this.habit().tags ?? [],
      newCal);
  }
}


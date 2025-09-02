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
        <p>
        @if (habit().timesperinstance === 1) {
          {{ habit().timesperinstance }}
        } @else {
          {{ habit().timesperinstance }}
        }
        times {{ habit().frequency }} </p>
                  <label class="progress-text" id="progress-numerator">{{habit().timesdone}}/{{habit().timesperinstance}} </label>

      </div>
      <div class="habit-section">
        @if (habit().timesperinstance != 1) {
          <div class="details-row">
              <a class="secondary" (click)="changeTracker(-1)">-</a>
              <input id="progress-tracker" type="range" min=0 max={{habit().timesperinstance}} value={{habit().timesdone}} class="slider" (input)="updateTracker()">
              <a class="secondary" (click)="changeTracker(1)">+</a>
            <a class="secondary" type="button" (click)="resetProgress()">Reset</a>
          </div>
        }
      </div>
      <div class="tag-section">
      @for(tag of habit().tags; track $index) {
        <a class="habit-tags" (click)="searchByTag(tag)" >{{ tag }}</a>
      }
      </div>
    </section>
  `,
  styleUrls: ['../../styles.css', './habit.css'],
})


export class Habit {
  habitService: HabitService = inject(HabitService);
  habit = input.required<HabitInfo>()
  
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

  // Called by delete habit button  clicked
  // Deletes habit through habit.service
  deleteHabit(id: number) {
    console.log(`Deleting habit from home: ${id}`)
    this.habitService.deleteHabit(id);
    window.location.reload();
  }
  // Sets progress tracker slider back to 0
  resetProgress() {
    var slider = <HTMLInputElement> document.getElementById("progress-tracker");
    slider.value = "0";
    this.updateTracker();        
  }

  // Takes in num of type number
  // Incraments (or decraments) tracker by said amount
  changeTracker(num: number){
    var slider = <HTMLInputElement> document.getElementById("progress-tracker");
    slider.value = (Number(slider.value) + Number(num)).toString();
    this.updateTracker();
  }
  
  // Updates progress tracker's label to the appropriate amount completed
  // and updates database with approprate amount completed
  updateTracker() {
    var slider = <HTMLInputElement> document.getElementById("progress-tracker");
    var str: string = slider.value + "/" + this.habit().timesperinstance;
    (document.getElementById("progress-numerator") as HTMLImageElement).textContent = (str);
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
}


import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { HabitService } from '../habit.service';
import { HabitInfo } from '../habit';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Calendar } from '../calendar/calendar';

@Component({
  selector: 'app-habitdetails',
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, Calendar],
  template: `
    <div class="primary-container" style="display: flex; justify-content: space-between;">
      <h1>{{habit?.name}}</h1>
      <div class="details-row">
        <a class="primary" (click)="deleteHabit(habit?.id)">Delete Habit</a>
        <a class="primary" [routerLink]="['/']">Back</a>
      </div>
    </div>
    <article>

      <div class="details-row">
        <div id="content-container" class="secondary-container">

          <div class="details-section">
            <div class="details-row">
              {{habit?.name}} {{ habit?.timesperinstance }} 
              @if (habit?.timesperinstance == 1) {
                time
              } @else {
                times
              } {{ habit?.frequency }}
              <a class="primary" type="button" (click)="toggleToday()">Toggle Complete</a>
            </div>

            <div class="desc-section">
            @if (habit?.timesperinstance != 1) {
              <div class="details-row">
                <input type="range" min=0 max={{habit?.timesperinstance}} value={{habit?.timesdone}} class="slider" id="progress-tracker" (input)="updateTracker()">
                <a class="primary" type="button" (click)="resetProgress()">Reset</a>
              </div>
              <div class="details-row">
                <label class="progress-text" id="progress-numerator">{{habit?.timesdone}}/{{habit?.timesperinstance}} </label>
              </div>
            }
            </div>
          </div>

          @if (!(habit?.description?.length === 0)) {
            <h3>Description</h3>
            <div class="details-section">
              @for (desc of habit?.description; track $index) {
                <div class="desc-section">
                <p>{{ desc }}</p>
                </div>
              }
            </div>
          }

          <h3>Tags</h3>
          <div class="details-section">
            <div class="tag-section">
            @for (tag of habit?.tags; track $index) {
              <a class="habit-tags" (click)="searchByTag(tag)">{{ tag }}</a>
            }
            </div>
          </div>
        </div>
        <app-calendar></app-calendar>
      </div>

      <div id="edit-habit" class="primary-container">
        <form [formGroup]="applyForm" (submit)="editHabit()">
          <h2>Edit Habit</h2>
          <div>              
            <label for="habit-name">Habit Name:</label>
            <input type="text" name="habit-name" value={{habit?.name}} formControlName="name" autocomplete="off" required>
          </div>
          <div>
            <input type="number" name="habit-timesperinstance" value={{habit?.timesperinstance}} formControlName="timesperinstance">
            <label for="habit-timesperinstance">time(s) per</label>
            <select name="habit-frequency" formControlName="frequency">
              <option value="daily" selected="selected">Day</option>
              <option value="weekly">Week</option>
              <option value="monthly">Month</option>
            </select>
          </div>

          <label for="habit-description">Description:</label>
          <br>
          <textarea name="habit-description" placeholder="Description (optional)" formControlName="description">
          </textarea>
          <div>
            <label for="habit-tags">Tags (separated by commas):</label>
            <input type="text" name="habit-tags" value={{habit?.tags}} formControlName="tags" autocomplete="off">
          </div>
          <button class="primary" type="submit">Save Habit</button>
        </form>
      </div>
    </article>
  `,
  styleUrls: [ '../../styles.css', './habitdetails.css'],
})

export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitService: HabitService = inject(HabitService);
  habit: HabitInfo | undefined;
  applyForm: FormGroup;
  habitId: number;


  constructor() {
    this.habitId = Number(this.route.snapshot.params['id']);
    this.applyForm = new FormGroup({
      name: new FormControl(''),
      timesperinstance: new FormControl(1),
      frequency: new FormControl('daily'),
      description: new FormControl(''),
      tags: new FormControl(''),
    });


    this.habitService.getHabitsById(this.habitId).then((habit) => {
      this.habit = habit;
      this.applyForm.patchValue({
        name: habit?.name ?? '',
        timesperinstance: habit?.timesperinstance ?? 1,
        frequency: habit?.frequency ?? 'daily',
        description: (habit?.description ?? []).join('\n'),
        tags: (habit?.tags ?? []).join(', ')
      });
    });
  }
  
  // Sets progress tracker slider back to 0
  resetProgress() {
    var slider = <HTMLInputElement> document.getElementById("progress-tracker");
    slider.value = "0";
    this.updateTracker();
  }
  
  // Updates progress tracker's label to the appropriate amount completed
  // and updates database with approprate amount completed
  updateTracker() {
    var slider = <HTMLInputElement> document.getElementById("progress-tracker");
    var str: string = slider.value + "/" + this.habit?.timesperinstance;
    (document.getElementById("progress-numerator") as HTMLImageElement).textContent = (str);
    this.habitService.updateProgress(
      this.habitId,
      this.habit?.name ?? '',
      Number(slider.value),
      this.habit?.timesperinstance ?? 1,
      this.habit?.frequency ??'daily',
      this.habit?.description ?? [],
      this.habit?.tags ?? [],
      this.habit?.calendar ?? []);
  }

  toggleToday() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = new Date;
    let strdate = months[today.getMonth()] + today.getDate() + today.getFullYear();
    console.log(strdate)
    const date = document.getElementById(strdate) as HTMLInputElement;
    if (date.checked == true) {
      date.checked = false;
    } else {
      date.checked = true;
    }
    console.log(strdate);
  }


  // searchByTag does not yet work
  // (Ideally) sends user to home and searches
  // using the tag
  searchByTag(tag: string): void {
    console.log(tag);
    window.location.href = '/';
    console.log(window.location)
    const searchInput = document.getElementById('search-bar') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = tag;
      searchInput.dispatchEvent(new Event('input'));
    }
  }

  // Call habitService's editHabit() using form inputs
  // in order to edit the habit's values
  editHabit() {
    this.habitService.editHabit(
      this.habitId,
      this.applyForm.value.name ?? '',
      this.habit?.timesdone ?? 0,
      Number(this.applyForm.value.timesperinstance) ?? 1,
      this.applyForm.value.frequency ?? 'daily',
      this.applyForm.value.description ?? '',
      (this.applyForm.value.tags ?? '')
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0),
    );
    window.location.reload();
  }

  // Call habitService's deleteHabit() using habit's id
  // in order to delete the habit
  deleteHabit(id: number | undefined) {
    if (id !== undefined) {
      console.log(`Deleting habit from details: ${id}`)
      this.habitService.deleteHabit(id);
    }
    window.location.href = '/';
  }
}


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
    <article class="habit-details">
      <div class="primary-container" style="display: flex; justify-content: space-between;">
        <h1>{{habit?.name}}</h1>
        <div class="details-row">
          <a class="primary" (click)="deleteHabit(habit?.id)">Delete Habit</a>
          <a class="primary" [routerLink]="['/']">Back</a>
        </div>
      </div>

      <div class="details-row">
        <div class="secondary-container">
          <section class="details-section">
            {{ habit?.timesperinstance }}
            @if (habit?.timesperinstance == 1) {
              time
            } @else {
              times
            } {{ habit?.frequency }}
          </section>

          @if (habit?.description) {
            <section class="details-section">
            @for (desc of habit?.description; track $index) {
              <p>{{ desc }}</p>
            }
            </section>
          }

          <section class="details-section">
            @for (tag of habit?.tags; track $index) {
              <a class="habit-tags" (click)="searchByTag(tag)">{{ tag }}</a>
            }
          </section>
        </div>
        <div class="secondary-container">
          <section class="details-section">
            <app-calendar></app-calendar>
          </section>
        </div>
      </div>

      <form [formGroup]="applyForm" (submit)="editHabit()">
          <div class="primary-container">
            <h3>Edit Habit</h3>
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
          </div>
        </form>
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


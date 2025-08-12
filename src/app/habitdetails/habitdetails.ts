import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { HabitService } from '../habit.service';
import { HabitInfo } from '../habit';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-habitdetails',
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  template: `
    <article class="habit-details">
      <div class="primary-container">

      <div style="display: flex; justify-content: space-between;">
        <h1>{{habit?.name}}</h1>
        <button class="primary" [routerLink]="['/']">Back</button>
      </div>

      <section class="habit-details-section">
        {{ habit?.timesperinstance }}
        @if (habit?.timesperinstance == 1) {
          time
        } @else {
          times
        } {{ habit?.frequency }}
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
      </div>

      <form [formGroup]="applyForm" (submit)="editHabit()">
          <div class="secondary-container">
            <h3>Edit Habit</h3>
            <div>              
              <label for="habit-name">Habit Name:</label>
              <input type="text" name="habit-name" value={{habit?.name}} formControlName="name" required>
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
            <textarea name="habit-description" placeholder="Description (optional)" formControlName="description"></textarea>
            <div>
            <label for="habit-tags">Tags (separated by commas):</label>
            <input type="text" name="habit-tags" value={{habit?.tags}} formControlName="tags">
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

  
  // applyForm = new FormGroup({
  //   name: new FormControl(''),
  //   timesperinstance: new FormControl(1),
  //   frequency: new FormControl('daily'),
  //   description: new FormControl(''),
  //   tags: new FormControl(''),
  // }); 

  // Initialize the habit's details page with the habit's current values
  // constructor() {
  //   const habitId = Number(this.route.snapshot.params['id']);
  //   this.habitService.getHabitsById(habitId).then((habit) => {
  //     this.habit = habit;
  //   })

  constructor() {
    const habitId = Number(this.route.snapshot.params['id']);
    this.habitService.getHabitsById(habitId).then((habit) => {
      this.habit = habit;
      this.applyForm.patchValue({
        name: habit?.name ?? '',
        timesperinstance: habit?.timesperinstance ?? 1,
        frequency: habit?.frequency ?? 'daily',
        description: habit?.description ?? '',
        tags: (habit?.tags ?? []).join(', ')
      });
    });

    this.applyForm = new FormGroup({
      name: new FormControl(''),
      timesperinstance: new FormControl(1),
      frequency: new FormControl('daily'),
      description: new FormControl(''),
      tags: new FormControl(''),
    });
  }

  // Edit the habit using the form values
  editHabit() {
    this.habitService.editHabit(
      this.habit?.id ?? 0,
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
 }

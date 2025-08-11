import { Component, inject } from '@angular/core';
import { HabitInfo } from '../habit';
import { Habit } from '../habit/habit';
import { HabitService } from '../habit.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ Habit, ReactiveFormsModule ],
  template: `
    <section>
        <form [formGroup]="applyForm" (submit)="createHabit()">
          <div class="home-container">
            <h3>Add New Habit</h3>
            <div>              
              <label for="habit-name">Habit Name:</label>
              <input type="text" name="habit-name" placeholder="Habit name" formControlName="name" required>
            </div>
            <div>
              <input type="number" name="habit-timesperinstance" value=1 formControlName="timesperinstance">
              <label for="habit-timesperinstance">time(s) per</label>
              <select name="habit-frequency" formControlName="frequency">
                <option value="daily">Day</option>
                <option value="weekly">Week</option>
                <option value="monthly">Month</option>
              </select>
            </div>

            <label for="habit-description">Description:</label>
            <br>
            <textarea name="habit-description" placeholder="Description (optional)" formControlName="description"></textarea>
            <div>
            <label for="habit-tags">Tags (separated by commas):</label>
            <input type="text" name="habit-tags" placeholder="Tags (separated by commas)" formControlName="tags">
            </div>
            <button class="primary" type="submit">Add Habit</button>
          </div>
        </form>

        <section>
          <h2>Habits</h2>
          <form>
            <input type="text" placeholder="Filter by tag or name" (input)="filterResults(filter.value)" #filter />
            <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
          </form>
        </section>
        <section class="results">
          @for(habit of filteredHabitList; track $index) {
            <app-habit [habit]="habit"></app-habit>
          }
        </section>
    </section>
  `,
  styleUrls: ['../../styles.css', './home.css'],
})

export class Home {
  habitList: HabitInfo[] = [];
  filteredHabitList: HabitInfo[] = [];
  habitService: HabitService = inject(HabitService);

  applyForm = new FormGroup({
    name: new FormControl(''),
    timesperinstance: new FormControl(1),
    frequency: new FormControl('daily'),
    description: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor() {
    this.habitList = this.habitService.getAllHabits();
    this.filteredHabitList = this.habitList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredHabitList = this.habitList;
      return;
    }

    this.filteredHabitList = this.habitList.filter((habit) =>
      // Habit?.tags.some((tag) => tag.toLowerCase().includes(text.toLowerCase()))
      habit.name.toLowerCase().includes(text.toLowerCase()) ||
      (habit.tags && habit.tags.some((tag) => tag.toLowerCase().includes(text.toLowerCase())))
    );
  }

  createHabit() {
    this.habitService.createHabit(
      this.applyForm.value.name ?? '',
      Number(this.applyForm.value.timesperinstance) ?? 1,
      this.applyForm.value.frequency ?? 'daily',
      this.applyForm.value.description ?? '',
      this.applyForm.value.tags ?? '',
    );
  }
}


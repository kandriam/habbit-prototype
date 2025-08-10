import { Component, inject } from '@angular/core';
import { HabitInfo } from '../habit';
import { Habit } from '../habit/habit';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-home',
  imports: [Habit],
  template: `
    <section>
        <form>
          <div class="home-container">
            <h3>Add New Habit</h3>
            <div>              
              <label for="habit-name">Habit Name:</label>
              <input type="text" name="habit-name" placeholder="Habit name" required>
            </div>

            <label for="habit-description">Description:</label>
            <br>
            <textarea name="habit-description" placeholder="Description (optional)"></textarea>
            <br>
            <label for="habit-tags">Tags:</label>
            <input type="text" name="habit-tags" placeholder="Tags (separated by commas)" />
            <br>
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
}


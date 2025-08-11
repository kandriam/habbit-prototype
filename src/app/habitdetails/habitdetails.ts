import {Component, inject} from '@angular/core';
import { RouterLink, RouterOutlet, ActivatedRoute} from '@angular/router';
import {HabitService} from '../habit.service';
import {HabitInfo} from '../habit';

@Component({
  selector: 'app-habitdetails',
  imports: [RouterLink, RouterOutlet],
  template: `
    <article class="habit-details">
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

      <form>
          <div class="habit-container">
            <h3>Edit Habit</h3>
            <div>              
              <label for="habit-name">Habit Name:</label>
              <input type="text" name="habit-name" value={{habit?.name}} required>
            </div>
            <div>
              <input type="number" name="habit-timesperinstance" value={{habit?.timesperinstance}}>
              <label for="habit-timesperinstance">time(s) per</label>
              <select name="habit-frequency" required>
                <option value="daily">Day</option>
                <option value="weekly">Week</option>
                <option value="monthly">Month</option>
              </select>
            </div>

            <label for="habit-description">Description:</label>
            <br>
            <textarea name="habit-description" placeholder="Description (optional)">{{habit?.description}}</textarea>
            <div>
            <label for="habit-tags">Tags:</label>
            <input type="text" name="habit-tags" value={{habit?.tags}} />
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
  // habitId = -1;


  constructor() {
    const habitId = Number(this.route.snapshot.params['id']);
    this.habit = this.habitService.getHabitsById(habitId);
  }
 }

import { Component, input } from '@angular/core';
import { HabitInfo } from '../habit';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <section class="habit-thumbnail">
      <div style="display: flex; justify-content: space-between;">
        <h3>{{ habit().name }}</h3>
        <a [routerLink]="['/details', habit().id]" class="details-button">Details</a>
      </div>
      <div class="thumbnail-sectin">
        @if (habit().timesperinstance === 1) {
          <p> {{ habit().timesperinstance }} time per day </p>
        } @else {
          <p> {{ habit().timesperinstance }} times per day </p>
        }
      </div>
      <div class="thumbnail-section">
      @for(tag of habit().tags; track $index) {
        <a class="habit-tags" (click)="searchByTag(tag)" >{{ tag }}</a>
      }
      </div>
    </section>
  `,
  styleUrls: ['../../styles.css', './habit.css'],
})
export class Habit {
  habit = input.required<HabitInfo>()
  
  searchByTag(tag: string): void {
    const searchInput = document.getElementById('search-bar') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = tag;
      searchInput.dispatchEvent(new Event('input'));
    }

  }
}


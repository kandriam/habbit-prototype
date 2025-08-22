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
        @if (habit().timesperinstance === 1) {
          <p> {{ habit().timesperinstance }} time per day </p>
        } @else {
          <p> {{ habit().timesperinstance }} times per day </p>
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
}


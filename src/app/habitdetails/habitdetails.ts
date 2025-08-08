import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HabitService} from '../habit.service';
import {HabitInfo} from '../habit';

@Component({
  selector: 'app-habitdetails',
  imports: [],
  template: `
    <h1>{{habit?.name}}</h1>
    <p>
      {{ habitId }}
    </p>
  `,
  styles: ``
})

export class Details {
   route: ActivatedRoute = inject(ActivatedRoute);
   habitId = -1;
   constructor() {
     this.habitId = Number(this.route.snapshot.params['id']);
   }
 }

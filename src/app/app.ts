import {Component} from '@angular/core';
import {Home} from './home/home';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Home, RouterModule],
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['/']"><h1>Habbit</h1></a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['../styles.css', './app.css'],
})
export class App {
  title = 'habbit';
}

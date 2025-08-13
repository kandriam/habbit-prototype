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
        <div id="date"></div>
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
  
  

  constructor () {
  }
}

window.onload = () => {
    displayDate();
}

function displayDate() {
    let months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date =  new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    var datedisplay = document.getElementById("date");
    datedisplay!.innerHTML = (`
      <h3>${m} / ${d} / ${y}</h3>
      <h4>${months[m-1]} ${d}, ${y}</h4>
      `)
  };
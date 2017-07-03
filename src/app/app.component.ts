import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-bar></app-bar>
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class App {
  title = 'app';
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-bar></app-bar>
    <chat-client></chat-client>
  `,
  styles: ['']
})
export class App {
  title = 'app';
}

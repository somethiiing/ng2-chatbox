import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services';
import * as io from 'socket.io-client';

@Component({
  selector: 'chat-client',
  template: `
    <div>
      <div class="messageBox" *ngFor="let message of messages">
        <p>{{message.user}}: {{message.text}}</p>
      </div>
      <div>
        <form (submit)="onSubmit()">
          <input
            autocomplete="off"
            type="text"
            [(ngModel)]="message.text"
            name="message"
          >
          <button
            type="submit"
            [disabled]="message.length < 1"
          >Send
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ['']
})

export class ChatClient {
  messages = [];
  message = {
    text: '',
    user: ''
  }
  socket;

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('priceUpdate', function (data) {
      this.messages = data;
    }.bind(this));
  }

  onSubmit() {
    console.log(this.message.text)
    this.socket.emit('add-message', this.message);
    this.message.text = '';
  }

}

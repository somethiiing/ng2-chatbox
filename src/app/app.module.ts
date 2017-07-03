import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { App } from './app.component';
import { AppBar, ChatClient } from './ui';

@NgModule({
  declarations: [
    App,
    AppBar,
    ChatClient
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }

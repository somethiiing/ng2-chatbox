import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { routes } from './router';

import { App } from './app.component';
import { AppBar, ChatClient, About, Auth } from './ui';

@NgModule({
  declarations: [
    App,
    AppBar,
    About,
    ChatClient
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    routes
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }

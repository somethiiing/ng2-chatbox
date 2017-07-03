import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { routes } from './router';
import { App } from './app.component';
import { AuthService, ApiService, ChatService } from './services';
import { AppBar, ChatClient, About, Auth } from './ui';

@NgModule({
  declarations: [
    App,
    AppBar,
    About,
    Auth,
    ChatClient
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routes
  ],
  providers: [
    ApiService,
    AuthService,
    ChatService
  ],
  bootstrap: [App]
})
export class AppModule { }

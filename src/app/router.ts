import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Auth, About, ChatClient } from './ui';
// import { AuthService } from './services';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  { path: '', component: ChatClient },
  { path: 'about', component: About },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' }
]);

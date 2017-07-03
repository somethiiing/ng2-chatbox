import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Auth, About, ChatClient } from './ui';
import { AuthService } from './services';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  { path: '', canActivate: [AuthService], component: ChatClient },
  { path: 'about', canActivate: [AuthService], component: About },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' }
]);

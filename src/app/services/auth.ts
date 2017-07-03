import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {

  JWT_KEY: string = 'chat_token';
  USER_KEY: string = 'user';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    const token = window.localStorage.getItem(this.JWT_KEY);

    if (token) { this.setJwt(token) }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.apiService.setHeaders({Authorization: `Bearer ${jwt}`});
  }

  setUser(user) {
    window.localStorage.setItem(this.USER_KEY, user);
  }

  isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem(this.JWT_KEY));
  }

  canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['auth']);
    }
  }

  authenticate(path, credits): Observable<any> {
    return this.apiService.post(`/${path}`, credits)
      .do(res => {
        if (res.token !== null) {
          this.setJwt(res.token);
          this.setUser(res.data.username);
          const data = { user: res.data.username, jwt: res.token };
          console.log(data);
        }
      })
      .map(res => res.status);
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.router.navigate(['auth']);
  }

}

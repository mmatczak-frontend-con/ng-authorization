import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import {securityContext} from './security-context';

export interface Credentials {
  user: string;
  password: string;
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export interface User {
  user: string;
  roles: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials): Observable<void> {
    return this.http.post<{ token: string }>('api/login', credentials)
      .pipe(
        pluck('token'),
        map(token => {
          securityContext.setToken(token);
        }),
      );
  }

  logout(): Observable<void> {
    return this.http.post('api/logout', null, {responseType: 'text'})
      .pipe(
        map(() => {
          securityContext.reset();
        })
      );
  }

  getUser(): Observable<User> {
    return securityContext.hasUser() ? of(securityContext.getUser()) : this.requestCurrentUserAndAddToContext();
  }

  private requestCurrentUserAndAddToContext(): Observable<User> {
    return this.http.get<User>('api/current-user')
      .pipe(
        map(user => {
          securityContext.setUser(user);
          return securityContext.getUser();
        })
      );
  }
}

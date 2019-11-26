import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {securityContext} from './security-context';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (securityContext.hasToken()) {
      request = req.clone({
        headers: req.headers.set('Authorization', securityContext.getToken())
      });
    }
    // return next.handle(request);
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.router.navigateByUrl('/login');
            return of(new HttpResponse());
          }
          return throwError(error);
        })
      );
  }
}

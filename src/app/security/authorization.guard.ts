import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SecurityService} from './security.service';
import {AuthorizedRoute} from './security.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  private accessDeniedPageUrlTree;

  constructor(private security: SecurityService, router: Router) {
    this.accessDeniedPageUrlTree = router.parseUrl('/access-denied');
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    const routeConfig = route.routeConfig as AuthorizedRoute;
    if (routeConfig) {
      if (routeConfig.permitAll) {
        return true;
      } else if (routeConfig.accessAllowedTo) {
        return this.security.userHasRole(routeConfig.accessAllowedTo)
          .pipe(
            map(isAuthorized => isAuthorized || this.accessDeniedPageUrlTree)
          );
      }
    }
    return this.accessDeniedPageUrlTree;
  }
}

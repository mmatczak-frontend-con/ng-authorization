import {Route, Router} from '@angular/router';
import {traverseTree} from '../utils/utils';
import {AuthorizationGuard} from './authorization.guard';

export function enableSecurityForRoutes(router: Router) {
  const routes = router.config;

  traverseTree<Route>({children: routes}, route => {
    const routeHasNoChildren = !(route.children && route.children.length);
    if (route.path && route.component && routeHasNoChildren) {
      route.canActivate = route.canActivate || [];
      route.canActivate.push(AuthorizationGuard);
    }
  });

  router.resetConfig(routes);
}

import {Route} from '@angular/router';

export type AuthorizedRoutes = AuthorizedRoute[];

export interface AuthorizedRoute extends Route {
  permitAll?: boolean;
  accessAllowedTo?: Role;
  children?: AuthorizedRoute[];
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export interface User {
  user: string;
  roles: Role[];
}

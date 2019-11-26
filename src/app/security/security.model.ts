export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export interface User {
  user: string;
  roles: Role[];
}

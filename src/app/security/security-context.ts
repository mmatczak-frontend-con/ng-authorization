// tslint:disable-next-line:only-arrow-functions
import {User} from './security.service';

// tslint:disable-next-line:only-arrow-functions
export const securityContext = function() {
  let token: string;
  let user: User;

  return {
    setToken(newToken: string) {
      token = newToken;
    },
    setUser(newUser: User) {
      user = newUser;
    },
    hasUser(): boolean {
      return user != null;
    },
    hasToken() {
      return token != null;
    },
    reset() {
      token = null;
      user = null;
    },
    getUser() {
      return user;
    },
    getToken() {
      return token;
    }
  };
}();

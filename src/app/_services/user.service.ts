import { Injectable } from '@angular/core';

import { User } from '../_models';

@Injectable()
export class UserService {
  constructor() { }
  activeUser: User;
  getCurrentUser() {
    return this.activeUser;
  }

  setCurrentUser(currentUser: User) {
    this.activeUser = currentUser;
  }

  addNewUser(newUser: User) {
    const existingUsers = localStorage.getItem('registeredUsers');
    let registerdUsers = JSON.parse(existingUsers) as User[];
    if (registerdUsers !== null) {
      if (this.doUserExisit(registerdUsers, newUser)) {
        return false;
      }
    } else {
      registerdUsers = [];
    }
    registerdUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registerdUsers));
    return true;
  }

  loginNewUser(mail: string, password: string) {
    const existingUsers = localStorage.getItem('registeredUsers');
    const registerdUsers = JSON.parse(existingUsers) as User[];
    if (registerdUsers !== null) {
      const currentUser = registerdUsers.find(us => (us.email.trim() === mail.trim() && us.password === password.trim()));
      if (currentUser) {
        this.activeUser = currentUser;
        return true;
      }
    }
    return false;
  }

  getAllUsers() {
    const existingUsers = localStorage.getItem('registeredUsers');
    return JSON.parse(existingUsers) as User[];
  }

  private doUserExisit(registerdUsers: User[], newUser: User) {
    return registerdUsers.some(us => us.email.trim() === newUser.email.trim());
  }
}

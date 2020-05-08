import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.currentUser = this.userService.getCurrentUser();
    this.users = this.userService.getAllUsers();
  }

//   deleteUser(id: number) {
//     this.userService.delete(id).pipe(first()).subscribe(() => {
//         this.loadAllUsers()
//     });
// }
}

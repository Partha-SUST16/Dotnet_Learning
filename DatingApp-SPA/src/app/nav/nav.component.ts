import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('logged in successfully');
      },
      (error) => {
        console.log('failed to login', error);
      }
    );
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}

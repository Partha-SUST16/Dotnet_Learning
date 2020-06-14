import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('logged in successfully');
        console.log('logged in successfully');
      },
      (error) => {
        this.alertify.error(error);
        console.log('failed to login', error);
      }
    );
  }
  loggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    console.log('logged out');
  }
}

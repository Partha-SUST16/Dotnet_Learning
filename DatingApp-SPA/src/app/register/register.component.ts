import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}

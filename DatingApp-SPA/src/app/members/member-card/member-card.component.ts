import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import { AuthService } from 'src/app/_service/auth.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  sendLike(id: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        (data) => {
          this.alertify.success('Liked ' + this.user.knownAs);
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }
}

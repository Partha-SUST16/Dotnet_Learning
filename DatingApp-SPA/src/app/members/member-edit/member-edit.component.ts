import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { UserService } from 'src/app/_service/user.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }
  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('profile edited successfully');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}

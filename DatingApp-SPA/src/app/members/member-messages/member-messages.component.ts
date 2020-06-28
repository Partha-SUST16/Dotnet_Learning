import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { Message } from 'src/app/_model/Message';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authServcie: AuthService,
    private userService: UserService,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authServcie.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authServcie.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((messages) => {
          for (let i = 0; i < messages.length; i++) {
            if (
              messages[i].isRead === false &&
              messages[i].recipientId === currentUserId
            )
              this.userService.markAsRead(currentUserId, messages[i].id);
          }
        })
      )
      .subscribe(
        (message) => {
          this.messages = message;
        },
        (err) => this.alert.error(err)
      );
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authServcie.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        (err) => this.alert.error(err)
      );
  }
}

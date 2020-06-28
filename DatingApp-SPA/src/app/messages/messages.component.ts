import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Message } from '../_model/Message';
import { Pagination, PaginatedResult } from '../_model/Pagination';
import { AlertifyService } from '../_service/alertify.service';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alert: AlertifyService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
      console.log(this.pagination);
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        (err) => this.alert.error(err)
      );
  }

  deleteMessage(id: number) {
    this.alert.confirm('Sure to Delete?', () => {
      this.userService
        .deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(
          () => {
            this.messages.splice(
              this.messages.findIndex((m) => m.id === id),
              1
            );
            this.alert.success('deleted');
          },
          (err) => this.alert.error(err)
        );
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}

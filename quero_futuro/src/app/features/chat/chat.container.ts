import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from 'src/app/shared/interfaces/chat.interface';
import { messagesMock } from 'src/app/shared/mocks/chat.mock';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-container',
  template: `
  <app-chat
  [messages]="messages$ | async"
  ($sendMessage)="sendMessage($event)"
  ></app-chat>
  `
})
export class ChatContainer implements OnInit {
  messages$!: Observable<Message[]>;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.sendInitialMessage();
  }

  sendInitialMessage(): void {
    this.messages$ = of(messagesMock)
  }

  sendMessage(messages: Message[]): void {
    console.warn(messages);
    
    this.messages$ = of(messages);
    this.sendChatHistory(messages);
  }

  sendChatHistory(messages: Message[]): void {
    this.messages$ = this.chatService.getCompletion(messages);
  }
}

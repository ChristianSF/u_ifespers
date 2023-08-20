import { Component } from '@angular/core';
import { RoleEnum } from 'src/app/shared/enums/chat.enum';
import { Message } from 'src/app/shared/interfaces/chat.interface';
import { messagesMock } from 'src/app/shared/mocks/chat.mock';

@Component({
  selector: 'app-chat-container',
  template: `
  <app-chat
  [messages]="messages"
  ($sendMessage)="sendMessage($event)"
  ></app-chat>
  `
})
export class ChatContainer {
  messages: Message[] = messagesMock; 

  sendMessage(message: string): void {
    this.pushNewMessage(message);
    this.sendChatHistory();
  }

  pushNewMessage(message: string): void {
    this.messages.push(
      {
        role: RoleEnum.USER,
        content: message,
        loading: false
      }
    )
  }

  sendChatHistory(): void {
    console.warn(this.messages);
    
  }
}

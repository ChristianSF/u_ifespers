import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/chat.interface';
import { RoleEnum } from '../../enums/chat.enum';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {
  roleEnum: typeof RoleEnum = RoleEnum;
  @Input() messages!: Message[];
}

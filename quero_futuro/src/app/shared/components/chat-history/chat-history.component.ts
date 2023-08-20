import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Message } from '../../interfaces/chat.interface';
import { RoleEnum } from '../../enums/chat.enum';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {
  roleEnum: typeof RoleEnum = RoleEnum;
  _messages: Message[];
  @Input() set messages(value: Message[]) {
    this._messages = value;
    this.scrollDown();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  scrollDown() {
    const element = this.elementRef.nativeElement.querySelector('#scrollTarget');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }
  
}

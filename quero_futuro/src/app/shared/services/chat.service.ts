import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../interfaces/chat.interface';
import { RoleEnum } from '../enums/chat.enum';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  getCompletion(messages: Message[]): Observable<Message[]> {
    return of([...messages, { role: RoleEnum.SYSTEM, content: 'fodasse', loading: false }]);
  }
}

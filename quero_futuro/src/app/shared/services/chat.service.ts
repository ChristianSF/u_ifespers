import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Message } from '../interfaces/chat.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getCompletion(messages: Message[]): Observable<Message[]> {
    const headers = new HttpHeaders({
      param: JSON.stringify(messages),
    });

    return this.httpClient
      .get<Message[]>(`${environment.apiBaseUrl}teste`, { headers })
      .pipe(
        map((resp) => {
          console.warn(resp);
          
          return resp;
        })
      );
  }
}

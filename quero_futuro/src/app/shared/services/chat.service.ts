import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Course, Message } from '../interfaces/chat.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { convertKebabToNormal } from '../utils/utils';
import { RoleEnum } from '../enums/chat.enum';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getProfession(
    messages: Message[]
  ): Observable<{ messages: Message[]; profession: string }> {
    const params = [messages[messages.length - 1]?.content];

    return this.httpClient
      .post<string>(`${environment.apiBaseUrl}profession`, params)
      .pipe(
        map((resp) => {
          return {
            messages: [
              {
                role: RoleEnum.SYSTEM,
                content: `Acredito que a profissão de ${convertKebabToNormal(
                  resp
                )} se encaixaria bem com o que você me apresentou.`,
              },
              {
                role: RoleEnum.SYSTEM,
                content: `É essa a profissão com a qual você gostaria de trabalhar?`,
              },
            ],
            profession: resp,
          };
        })
      );
  }

  getCourses(profession: string): Observable<Message[]> {
    
    return this.httpClient.get<string[]>(`${environment.apiBaseUrl}courses?profession=${profession}`).pipe(
      map((resp) => {
        return [
          {
            role: RoleEnum.SYSTEM,
            content: resp.length > 1 ? `Nossa recomendação é que você faça os cursos: ${this.getCoursesNames(resp)}` : `Nossa recomendação é que você faça o curso ${convertKebabToNormal(resp[0])}`
          },
        ];
      })
    );
  }

  getCoursesNames(courses: string[]): string {
    let array = courses;
    array.map(item => convertKebabToNormal(item));
    return array.join(', ') + ' ';
  }
}

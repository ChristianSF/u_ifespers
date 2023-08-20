import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApplicationStateEnum, RoleEnum } from 'src/app/shared/enums/chat.enum';
import { Course, Message } from 'src/app/shared/interfaces/chat.interface';
import { messagesMock } from 'src/app/shared/mocks/chat.mock';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-container',
  template: `
    <app-chat
      [messages]="messages$ | async"
      [profession]="profession$ | async"
      [courses]="courses$ | async"
      [applicationState]="applicationState"
      ($sendMessage)="sendMessage($event)"
    ></app-chat>
  `,
})
export class ChatContainer implements OnInit {
  messages$!: Observable<Message[]>;
  profession$!: Observable<Message[]>;
  courses$!: Observable<Message[]>;
  profession: string;
  applicationState!: ApplicationStateEnum;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.sendInitialMessage();
    this.setInitialApplicationState();
  }

  sendInitialMessage(): void {
    this.messages$ = of(messagesMock);
  }

  setInitialApplicationState(): void {
    this.applicationState = ApplicationStateEnum.DESCRIBING_PROFESSION;
  }

  sendMessage(messages: Message[]): void {

    this.messages$ = of(messages);

    if (this.applicationState === ApplicationStateEnum.DESCRIBING_PROFESSION) {
      this.getProfession(messages);
      this.applicationState = ApplicationStateEnum.CONFIRMING_PROFESSION;
      return;
    }

    if (this.applicationState === ApplicationStateEnum.CONFIRMING_PROFESSION) {
      if (
        messages[messages.length - 1]?.content.toLowerCase().includes('sim')
      ) {
        this.messages$ = of([
          ...messages,
          {
            role: RoleEnum.SYSTEM,
            content: 'Ótimo!',
          },
          {
            role: RoleEnum.SYSTEM,
            content:
              'Nosso próximo passo é entender quais são os cursos que te levarão até essa profissão!',
          },
        ]);
        this.applicationState = ApplicationStateEnum.PROFESSION_CONFIRMED;
        this.getCourses(messages);
        return;
      } else {
        this.messages$ = of([
          ...messages,
          {
            role: RoleEnum.SYSTEM,
            content: 'Que pena!',
          },
          {
            role: RoleEnum.SYSTEM,
            content:
              'Vamos tentar novamente. Consegue me definir com mais detalhes como você gostaria que fosse o seu dia-a-dia de trabalho? Tente incluir descrições que definam a função. Com o quê você gostaria de trabalhar?',
          },
        ]);
        this.applicationState = ApplicationStateEnum.DESCRIBING_PROFESSION;
      }
    }

    if (this.applicationState === ApplicationStateEnum.PROFESSION_CONFIRMED) {
    }
  }

  getProfession(messages: Message[]): void {
    this.profession$ = this.chatService.getProfession(messages).pipe(
      map((resp) => {
        this.profession = resp.profession;
        return resp.messages;
      })
    );
  }

  getCourses(messages: Message[]): void {
    console.warn(this.profession);
    
    this.courses$ = this.chatService.getCourses(this.profession).pipe(
      map((resp) => {
        this.messages$ = of([...messages, ...resp]);
        return resp;
      })
    );
  }
}

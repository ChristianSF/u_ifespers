import { RoleEnum } from '../enums/chat.enum';
import { Message } from '../interfaces/chat.interface';

export const messagesMock: Message[] = [
  {
    role: RoleEnum.SYSTEM,
    content:
      'Olá, vou te ajudar a entender as suas necessidades para escolher o melhor cursos para a sua carreira profissional!',
    loading: false,
  },
  {
    role: RoleEnum.SYSTEM,
    content:
      'Poderia me descrever como você imagina o dia a dia do seu trabalho dos sonhos?',
    loading: false,
  },
];

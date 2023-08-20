import { RoleEnum } from '../enums/chat.enum';
import { Message } from '../interfaces/chat.interface';

export const messagesMock: Message[] = [
  {
    role: RoleEnum.SYSTEM,
    content: 'Com qual área de estudo você mais se identifica?',
    loading: false,
  },
  {
    role: RoleEnum.USER,
    content: 'Humanas',
    loading: false,
  },
  {
    role: RoleEnum.SYSTEM,
    content: 'Certo, só um momento!',
    loading: false,
  },
  {
    role: RoleEnum.SYSTEM,
    content: 'Certo, só um momento!',
    loading: true,
  },
  {
    role: RoleEnum.USER,
    content: 'bla bla bla',
    loading: false,
  },
];

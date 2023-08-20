import { RoleEnum } from '../enums/chat.enum';
import { Message } from '../interfaces/chat.interface';

export const messagesMock: Message[] = [
  {
    role: RoleEnum.SYSTEM,
    content: 'Com qual área de estudo você mais se identifica?',
    loading: false,
  },
];

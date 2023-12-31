import { RoleEnum } from "../enums/chat.enum";

export interface Message {
    content: string;
    role: RoleEnum;
    loading?: boolean;
}

export interface Course {
    title: string;
    description: string;
}
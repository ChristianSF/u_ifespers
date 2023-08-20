import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatHistoryComponent } from 'src/app/shared/components/chat-history/chat-history.component';
import { ChatContainer } from './chat.container';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, ChatHistoryComponent, ChatContainer],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ChatComponent, ChatContainer],
})
export class ChatModule {}

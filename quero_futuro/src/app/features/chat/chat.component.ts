import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'src/app/shared/interfaces/chat.interface';
import { OnInit} from '@angular/core'
import { RoleEnum } from 'src/app/shared/enums/chat.enum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  form!: FormGroup;

  @Input() messages!: Message[];

  @Output() $sendMessage: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      message: ['']
    })
  }

  sendMessage(): void {
    this.$sendMessage.emit(
      [
        ...this.messages,
        {
          role: RoleEnum.USER,
          content: this.form.get('message')?.value
        }
      ]
    );
  }
}

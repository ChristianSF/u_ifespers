import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ChatComponent } from './features/chat/chat.component';
import { ChatContainer } from './features/chat/chat.container';
import { NotfoundComponent } from './features/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat', component: ChatContainer },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

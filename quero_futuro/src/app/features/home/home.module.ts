import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatIconModule} from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [HomeComponent],
})
export class HomeModule {}

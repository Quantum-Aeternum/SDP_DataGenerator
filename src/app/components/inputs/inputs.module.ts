import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { RandomInputComponent } from './random-input/random-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [
    InputComponent,
    RandomInputComponent
  ],
  exports: [
    InputComponent,
    RandomInputComponent
  ]
})
export class InputsModule { }
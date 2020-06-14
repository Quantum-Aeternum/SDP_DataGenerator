import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatListModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { RandomInputComponent } from './random-input/random-input.component';
import { TypeSelectorComponent } from './type-selector/type-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule
  ],
  declarations: [
    InputComponent,
    RandomInputComponent,
    TypeSelectorComponent
  ],
  exports: [
    InputComponent,
    RandomInputComponent,
    TypeSelectorComponent
  ]
})
export class InputsModule { }

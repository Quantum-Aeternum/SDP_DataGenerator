import { NgModule } from '@angular/core';
import { ColumnDialogComponent } from './column-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { InputsModule } from 'src/app/components/inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    InputsModule
  ],
  declarations: [
    ColumnDialogComponent
  ]
})
export class ColumnDialogModule { }

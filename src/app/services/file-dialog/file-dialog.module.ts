import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { InputsModule } from '../../components/inputs/inputs.module';
import { FileDialogComponent } from './file-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    InputsModule,
    MatSelectModule
  ],
  declarations: [
    FileDialogComponent
  ]
})
export class FileDialogModule { }

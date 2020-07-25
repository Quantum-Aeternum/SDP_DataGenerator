import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatExpansionModule, MatProgressSpinnerModule, MatToolbarModule, MatBadgeModule, MatSnackBarModule, MatTableModule, MatInputModule, MatDialogModule, MatListModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TableComponent } from './components/table/table.component';
import { ColumnComponent } from './components/column/column.component';
import { NotificationsService, ConfirmDialog } from './services/notifications.service';
import { ContainerService } from './services/container.service';
import { ToggleControlsComponent } from './components/toggle-controls/toggle-controls.component';
import { ColumnDialogModule } from './services/column-dialog/column-dialog.module';
import { ColumnDialogComponent } from './services/column-dialog/column-dialog.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { InputsModule } from './components/inputs/inputs.module';
import { FileDialogComponent } from './services/file-dialog/file-dialog.component';
import { FileDialogModule } from './services/file-dialog/file-dialog.module';
import { TableDialogComponent } from './services/table-dialog/table-dialog.component';
import { TableDialogModule } from './services/table-dialog/table-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ColumnComponent,
    ConfirmDialog,
    ToggleControlsComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableDialogModule,
    ColumnDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    InputsModule,
    FileDialogModule
  ],
  entryComponents: [
    TableDialogComponent,
    ColumnDialogComponent,
    ConfirmDialog,
    FileDialogComponent
  ],
  providers: [
    NotificationsService,
    ContainerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

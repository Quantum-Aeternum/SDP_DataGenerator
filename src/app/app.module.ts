import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatExpansionModule, MatProgressSpinnerModule, MatToolbarModule, MatBadgeModule, MatSnackBarModule, MatTableModule, MatInputModule, MatDialogModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TableComponent } from './components/table/table.component';
import { ColumnComponent } from './components/column/column.component';
import { NotificationsService, ConfirmDialog } from './services/notifications.service';
import { TableDialogComponent } from './components/table/table-dialog.component';
import { TableDialogModule } from './components/table/table-dialog.module';
import { ContainerService } from './services/container.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ColumnComponent,
    ConfirmDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableDialogModule,
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
    MatDialogModule
  ],
  entryComponents: [
    TableDialogComponent,
    ConfirmDialog
  ],
  providers: [
    NotificationsService,
    ContainerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

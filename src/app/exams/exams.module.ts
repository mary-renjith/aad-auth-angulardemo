import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { DataSource } from '@angular/cdk/collections';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { AddExamsComponent } from './add-exams/add-exams.component';
import { EditExamsComponent } from './edit-exams/edit-exams.component';
import { ListExamsComponent } from './list-exams/list-exams.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteExamDialogComponent } from './delete-exam-dialog/delete-exam-dialog.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule,BUCKET } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root' // just before your class
})




@NgModule({
  declarations: [
    AddExamsComponent,
    EditExamsComponent,
    ListExamsComponent,
    DeleteExamDialogComponent
  ],
  imports: [
    MatListModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers:[
   {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration:2500}} 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    AddExamsComponent,
    EditExamsComponent,
    ListExamsComponent
  ],
  
})
export class ExamsModule { }

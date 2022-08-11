import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkillsComponent } from './list-skills/list-skills.component';
import { ViewSkillComponent } from './view-skill/view-skill.component';
import { CreateSkillComponent } from './create-skill/create-skill.component';
import { UpdateSkillComponent } from './update-skill/update-skill.component';
import { DeleteSkillComponent } from './delete-skill/delete-skill.component';
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
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    ListSkillsComponent,
    ViewSkillComponent,
    CreateSkillComponent,
    UpdateSkillComponent,
    DeleteSkillComponent,
    DeletedialogComponent
  ],
  imports: [
    CommonModule,
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
    MatDialogModule
  ],
  providers:[
   {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration:2500}} 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SkillsModule { }

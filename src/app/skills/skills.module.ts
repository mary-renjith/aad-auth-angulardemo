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
import { DataSource } from '@angular/cdk/collections';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    ListSkillsComponent,
    ViewSkillComponent,
    CreateSkillComponent,
    UpdateSkillComponent,
    DeleteSkillComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatSortModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SkillsModule { }

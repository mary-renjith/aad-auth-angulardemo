import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import {MatTableDataSource} from '@angular/material/table';
import { JsonTypes } from '@azure/msal-common/dist/utils/Constants';



@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.scss']
})

export class ListSkillsComponent implements OnInit {

  listSkills! : Observable<any>;
  displayedColumns: string[] = ['SkillName', 'SkillLevel', 'SkillYrsOfExp'];
  dataSource = this.listSkills;
  constructor(private skillService: SkillService) { }
 

  ngOnInit(): void {
    
    this.listSkills = this.skillService.listskill();
    

  }

}

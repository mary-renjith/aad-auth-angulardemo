import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import {MatTableDataSource} from '@angular/material/table';
import { JsonTypes } from '@azure/msal-common/dist/utils/Constants';
import { Pipe, PipeTransform } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


interface Years {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})


export class CreateSkillComponent implements OnInit {

  
  listSkillNames! : any;
 

  addSkillForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private skillService: SkillService) { }
  // dataSource = this.listSkillNames; 
  years: Years[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'},
    {value: '10', viewValue: '10'}
  ];

  ngOnInit(): void {
    this.addSkillForm = this.formBuilder.group({
      'skillName' : new FormControl(''),
      'skillLevel' : new FormControl(''),
      'skillExp' : new FormControl('')
    });
  //   this.skillService.listSkillName().subscribe((data: any) => {
  //     this.dataSource=new  MatTableDataSource(data)
      
  // }); 
   this.listSkillNames=this.skillService.listSkillName().subscribe(data=>{
    this.listSkillNames=data;
   });
   console.log(this.listSkillNames);

  }
  formatLabel(value: number) {
    if (value == 1) {
      return 'beginner';
    }
    else if (value == 2) {
      return 'novice';
    }
    else if (value == 3) {
      return 'expert';
    }
    else if (value == 4) {
      return 'proficient';
    }    
    return value;
  }
  createSkill()
  {
    console.log(this.addSkillForm.value);
  }  

}

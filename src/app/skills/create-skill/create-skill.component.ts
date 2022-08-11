import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import {MatTableDataSource} from '@angular/material/table';
import { JsonTypes } from '@azure/msal-common/dist/utils/Constants';
import { Pipe, PipeTransform } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { MatList } from '@angular/material/list';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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
  jsonObject: any;
  arrayObj: any = [
    {
      id: "1",
      name: "1"
    },
    {
      id: "2",
      name: "2"
    },
    {
      id: "3",
      name: "3"
    },
    {
      id: "4",
      name: "4"
    },
    {
      id: "5",
      name: "5"
    },
    {
      id: "6",
      name: "6"
    },
    {
      id: "7",
      name: "7"
    },
    {
      id: "8",
      name: "8"
    },
    {
      id: "9",
      name: "9"
    },
    {
      id: "10",
      name: "10"
    }
  ]


  addSkillForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, 
    private skillService: SkillService,
    private _snackBar: MatSnackBar,
    private _router: Router) {
    this.jsonObject = <JSON>this.arrayObj;

  }
  dataSource = this.listSkillNames; 



  ngOnInit(): void {
    this.addSkillForm = this.formBuilder.group({
      'SkillId' : new FormControl(''),
      'skillDetailId' : new FormControl(0),
      'SkillLevel' : new FormControl(''),
      'SkillYrsOfExp' : new FormControl(""),
      'UserEmail' : new FormControl("mary.renjith19@gmail.com"),
    });
  

 
    this.listSkillNames=this.skillService.listSkillName().subscribe((data:any)=>{
    this.dataSource=data;
   });
   console.log(this.dataSource);

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
    this.skillService.addSkill(this.addSkillForm.value).subscribe({next:data => {
      
      this._snackBar.open("Skill Added Successfully");
      this._router.navigate(['list']);
   
    }, error: err => {
      this._snackBar.open("Unable to add Skill");
      this._router.navigate(['list']);
      
    }});
    
  }  

}

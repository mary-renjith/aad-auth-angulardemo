import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import {MatTableDataSource} from '@angular/material/table';
import { JsonTypes } from '@azure/msal-common/dist/utils/Constants';
import { Pipe, PipeTransform } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { MatList } from '@angular/material/list';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss']
})
export class UpdateSkillComponent implements OnInit {

  listSkillNames! : any;
  jsonObject: any;
  defSkillId:any;
  defskillDetailId:any;
  defskillLevel:any;
  defskillExp:any;
  arrayObj: any = [
    {
      id: 1,
      name: "1"
    },
    {
      id: 2,
      name: "2"
    },
    {
      id: 3,
      name: "3"
    },
    {
      id: 4,
      name: "4"
    },
    {
      id: 5,
      name: "5"
    },
    {
      id: 6,
      name: "6"
    },
    {
      id: 7,
      name: "7"
    },
    {
      id: 8,
      name: "8"
    },
    {
      id: 9,
      name: "9"
    },
    {
      id: 10,
      name: "10"
    }
  ]


  editSkillForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, 
    private skillService: SkillService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder) {
    this.jsonObject = <JSON>this.arrayObj;

  }
  dataSource = this.listSkillNames; 
 

  ngOnInit(): void {

    this.defSkillId=history.state.skillId;
    this.defskillDetailId=history.state.skillDetailId;
    this.defskillExp=history.state.skillYrsExp;
    this.defskillLevel=history.state.skillLevel;

    this.editSkillForm = this.formBuilder.group({
      'SkillId' : new FormControl(''),
      'skillDetailId' : new FormControl(this.defskillDetailId),
      'SkillLevel' : new FormControl(''),
      'SkillYrsOfExp' : new FormControl(""),
      'UserEmail' : new FormControl("mary.renjith19@gmail.com"),
    });

    this.listSkillNames=this.skillService.listSkillName().subscribe((data:any)=>{
      this.dataSource=data;
     });
     
    
   
   //console.log(this.defskillExp,this.defskillLevel);
   
   this.editSkillForm.controls['SkillId'].setValue( this.defSkillId);
   this.editSkillForm.controls['SkillLevel'].setValue( this.defskillLevel);
   this.editSkillForm.controls['SkillYrsOfExp'].setValue( this.defskillExp);

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
  editSkill()
  {
    this.skillService.editSkill(this.editSkillForm.value).subscribe({next:data => {
      
      this._snackBar.open("Skill updated Successfully");
      this._router.navigate(['list']);
   
    }, error: err => {
      this._snackBar.open("Unable to add Skill");
      this._router.navigate(['list']);
      
    }});
    
  }  

}

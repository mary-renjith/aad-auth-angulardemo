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
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


interface Years {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
   
 

  matcher = new MyErrorStateMatcher();

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
      'SkillId' : new FormControl('',[Validators.required]),
      'skillDetailId' : new FormControl(0),
      'SkillLevel' : new FormControl('',[Validators.required]),
      'SkillYrsOfExp' : new FormControl("",[Validators.required]),
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
    console.log(this.addSkillForm.valid);
    if(this.addSkillForm.valid == false){

      this._snackBar.open("Invalid Input");
    }
    else{
      this.skillService.addSkill(this.addSkillForm.value).subscribe({next:data => {
      
        this._snackBar.open("Skill Added Successfully");
        this._router.navigate(['list']);
     
      }, error: err => {
        this._snackBar.open("Unable to add Skill");
        this._router.navigate(['list']);
        
      }});
      
    }
   
  } 
  
  someMethod(event:any)
  {
      //console.log(event.value);
      this.skillService.checkSkill(event.value).subscribe({next:data => {
        if(data == 1)
        {
          this._snackBar.open("Skill Already Exists");  
          this.addSkillForm.reset();
        }
        
            
     
      }, error: err => {
        this._snackBar.open("Service Error");
        
      }});
  }

}

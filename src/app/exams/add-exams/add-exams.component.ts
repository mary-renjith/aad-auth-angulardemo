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
import { MatDatepicker } from '@angular/material/datepicker';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.scss']
})
export class AddExamsComponent implements OnInit {
  
  value: any = 'Clear me';
  listSkillNames! : any;
  fileName = '';
  dataSource:any;
  matcher = new MyErrorStateMatcher();

  addSkillForm: FormGroup = new FormGroup({});
 

 
  constructor(private formBuilder: FormBuilder, 
    private skillService: SkillService,
    private _snackBar: MatSnackBar,
    private _router: Router) { 
    
    }
    addCertificationForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.addCertificationForm = this.formBuilder.group({
      'examDetailId' : new FormControl("0"),
      'skillDetailId' : new FormControl('',[Validators.required]),
      'skillName' : new FormControl(""),      
      'examDate' : new FormControl("",[Validators.required]),
      'expiryDate' : new FormControl("",[Validators.required]),
      'examName' : new FormControl("",[Validators.required]),
      'fileName' : new FormControl(""),
      'certificateImage' : new FormControl("img"),
      'userEmail' : new FormControl("mary.renjith19@gmail.com"),
    }); 

    this.listSkillNames=this.skillService.listaAddedSkillNames().subscribe((data:any)=>{
      this.dataSource=data;
     });
  }

  createCertification()
  {
    console.log(this.addCertificationForm.value);
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;

        //const formData = new FormData();

        //formData.append("thumbnail", file);
        console.log(file,this.fileName);
    }
  }

  createExam()
  {
    console.log(this.addCertificationForm.valid);
    if(this.addCertificationForm.valid == false){

      this._snackBar.open("Invalid Input");
    }
    else{
      this.skillService.addExam(this.addCertificationForm.value).subscribe({next:data => {
      
        this._snackBar.open("Certification Details Added Successfully");
        this._router.navigate(['listExam']);
     
      }, error: err => {
        this._snackBar.open("Unable to add the Certification Details");
        this._router.navigate(['listExam']);
        
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

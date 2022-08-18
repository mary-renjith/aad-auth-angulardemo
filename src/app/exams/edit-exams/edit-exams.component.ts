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
  selector: 'app-edit-exams',
  templateUrl: './edit-exams.component.html',
  styleUrls: ['./edit-exams.component.scss']
})
export class EditExamsComponent implements OnInit {

  value: any = 'Clear me';
  listSkillNames! : any;
  fileName = '';
  dataSource:any;
  defskillDetailId:any;
  defExamDetailId:any;
  defExamName: any;
  defExamDate: any;
  defExpiryDate:any;

  matcher = new MyErrorStateMatcher();

  addSkillForm: FormGroup = new FormGroup({});
 

 
  constructor(private formBuilder: FormBuilder, 
    private skillService: SkillService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder) { 
    
    }
   editCertificationForm: FormGroup = new FormGroup({});
   
  ngOnInit(): void {
    // console.log(history.state);
    this.defskillDetailId=history.state.skillDetailId;
    this.defExamDetailId=history.state.examDetailId;
    this.defExamName=history.state.examName;
    this.defExamDate=history.state.examDate;
    this.defExpiryDate=history.state.expiryDate;

    //  console.log(this.defskillDetailId,this.defExamDetailId,this.defExamName,this.defExamDate);
    this.editCertificationForm = this.formBuilder.group({
      'ExamDetailId' : new FormControl(this.defExamDetailId),
      'SkillDetailId' : new FormControl(this.defskillDetailId),
      'SkillName' : new FormControl(''),      
      'ExamDate' : new FormControl('',[Validators.required]),
      'ExpiryDate' : new FormControl('',[Validators.required]),
      'ExamName' : new FormControl('',[Validators.required]),
      'FileName' : new FormControl(''),
      'CertificateImage' : new FormControl("img"),
      'UserEmail' : new FormControl("mary.renjith19@gmail.com"),
    }); 

    this.listSkillNames=this.skillService.listaAddedSkillNames().subscribe((data:any)=>{
      this.dataSource=data;       
     });
    
  }

 

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;

        //const formData = new FormData();

        //formData.append("thumbnail", file);
       // console.log(file,this.fileName);
    }
  }

  editExam()
  {
    //console.log(this.editCertificationForm.valid);
    if(this.editCertificationForm.valid == false){

      this._snackBar.open("Invalid Input");
    }
    else{
      this.skillService.addExam(this.editCertificationForm.value).subscribe({next:data => {
      
        this._snackBar.open("Certification Details updated Successfully");
        this._router.navigate(['listExam']);
     
      }, error: err => {
        this._snackBar.open("Unable to update the Certification Details");
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

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
  fileName:any="";
  image:any="";
  dataSource:any;
  matcher = new MyErrorStateMatcher();

  imageError: any;
  isImageSaved: any;
  cardImageBase64: any;


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
      'fileName' : new FormControl(this.fileName),
      'certificateImage' : new FormControl(this.image),
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
    this.fileName=file.name;
    var myReader:FileReader=new FileReader();

    myReader.onloadend=(e)=>{
      
      this.image=myReader.result;
      // var imagestr = this.image.split(',')[1];
      // this.image=imagestr;
    }
    myReader.readAsDataURL(file);
    
  }
  

  createExam()
  {
    console.log(this.image);
    this.addCertificationForm.controls['certificateImage'].setValue(this.image);
    this.addCertificationForm.controls['fileName'].setValue(this.fileName);
    const fromDate = this.addCertificationForm.controls['examDate'].value;
    const toDate = this.addCertificationForm.controls['expiryDate'].value;

    var today = new Date();
    console.log(this.addCertificationForm.value);
    if(this.addCertificationForm.valid == false){
 
      this._snackBar.open("Invalid Input");
    }
    else if ((fromDate !== null && toDate !== null) && fromDate > toDate){
     
      this._snackBar.open("Expiry date should be greater than certification date");
      
    }
    else if(today>toDate)
    {
      this._snackBar.open("Expiry date should be greater than today");
    }
    else if(fromDate>today)
    {
      this._snackBar.open("Certification date should not be greater than today");
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

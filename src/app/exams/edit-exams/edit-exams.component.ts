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
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { delay, finalize } from 'rxjs/operators';

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
  fileName = "";
  image:any="";
  dataSource:any;
  defskillDetailId:any;
  defExamDetailId:any;
  defExamName: any;
  defExamDate: any;
  defExpiryDate:any;
  defImg:any;
  defname: any;
  downloadURL:any="";
  refURL: any;
  url: any;

  matcher = new MyErrorStateMatcher();

  addSkillForm: FormGroup = new FormGroup({});
 

 
  constructor(private formBuilder: FormBuilder, 
    private skillService: SkillService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder,
    private storage: AngularFireStorage) { 
    
    }
   editCertificationForm: FormGroup = new FormGroup({});
   
  ngOnInit(): void {
    // console.log(history.state);
    this.defskillDetailId=history.state.skillDetailId;
    this.defExamDetailId=history.state.examDetailId;
    this.defExamName=history.state.examName;
    this.defExamDate=history.state.examDate;
    this.defExpiryDate=history.state.expiryDate;
    this.defImg=history.state.img;
    this.defname=history.state.fname;
    //console.log(this.defImg);
    //  console.log(this.defskillDetailId,this.defExamDetailId,this.defExamName,this.defExamDate);
    this.editCertificationForm = this.formBuilder.group({
      'ExamDetailId' : new FormControl(this.defExamDetailId),
      'SkillDetailId' : new FormControl(this.defskillDetailId),
      'SkillName' : new FormControl(''),      
      'ExamDate' : new FormControl('',[Validators.required]),
      'ExpiryDate' : new FormControl('',[Validators.required]),
      'ExamName' : new FormControl('',[Validators.required]),
      'FileName' : new FormControl("fake.png"),
      'CertificateImage' : new FormControl(""),
      'UserEmail' : new FormControl("mary.renjith19@gmail.com"),
    }); 

    this.listSkillNames=this.skillService.listaAddedSkillNames().subscribe((data:any)=>{
      this.dataSource=data;       
     });
    
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

  async editExam()
  {
    console.log(this.fileName);
    console.log(this.downloadURL);
    await this.sleep(1000);

    if(this.downloadURL != ""){
      this.editCertificationForm.controls['CertificateImage'].setValue(this.downloadURL,{onlySelf:true});
      this.editCertificationForm.controls['FileName'].setValue(this.fileName);
    
    }
    else
    {
      this.editCertificationForm.controls['CertificateImage'].setValue(this.defImg,{onlySelf:true});     
      this.editCertificationForm.controls['FileName'].setValue(this.defname);
    }
   

    const fromDate = this.editCertificationForm.controls['ExamDate'].value;
    const toDate = this.editCertificationForm.controls['ExpiryDate'].value;

    var today = new Date();

    if(this.editCertificationForm.valid == false){
 
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
  sleep(ms:any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
onFileSelectedEv(event:any) {
    var n = Date.now();
    const file = event.target.files[0];    
    this.fileName=file.name;
    const filePath = `skillportal/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`skillportal/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          //this.downloadURL = fileRef.getDownloadURL();
          fileRef.getDownloadURL().subscribe(url => {
            if (url) {
              this.downloadURL = url;
            }
            console.log("test");
            console.log(this.downloadURL);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
     
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

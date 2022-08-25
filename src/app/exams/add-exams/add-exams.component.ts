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
import { finalize } from 'rxjs/operators';

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
  image:any;
  dataSource:any;
  key: any;
  name: any;
  url: any;
  //file: File;

  matcher = new MyErrorStateMatcher();

  imageError: any;
  isImageSaved: any;
  cardImageBase64: any;
  downloadURL:any="";
  refURL: any;
  addSkillForm: FormGroup = new FormGroup({});
 

 
  constructor(private formBuilder: FormBuilder, 
    private skillService: SkillService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private storage: AngularFireStorage)
    //file: File
     { 
      //this.file = file;
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
      'certificateImage' : new FormControl(""),
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
    
    
    this.image=file;
    this.fileName=file.name;
    this.addCertificationForm.controls['certificateImage'].setValue( this.image);
   
    // this.fileName=file.name;
    // var myReader:FileReader=new FileReader();

    // myReader.onloadend=(e)=>{
      
    //   this.image=myReader.result;
    //   // var imagestr = this.image.split(',')[1];
    //   // this.image=imagestr;
    // }
    // myReader.readAsDataURL(file);
    
  }

  onImageChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.image = reader.result as string;
        this.addCertificationForm.patchValue({
          certificateImage: encodeURI(reader.result as string),
          fileName: file.name
        });
   
      };
    }
  }
 
  onFileSelectedEv(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `skillportal/${n}`;
    this.fileName=file.name;
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
  async createExam()
  {
    await this.sleep(1000);
    console.log(this.downloadURL);
    if(this.downloadURL!= "")
    {  this.addCertificationForm.controls['certificateImage'].setValue(this.downloadURL);
      //this.addCertificationForm.controls['fileName'].setValue(this.fileName);
    }
  
    const fromDate = this.addCertificationForm.controls['examDate'].value;
    const toDate = this.addCertificationForm.controls['expiryDate'].value;

    var today = new Date();
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
  

  sleep(ms:any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

}

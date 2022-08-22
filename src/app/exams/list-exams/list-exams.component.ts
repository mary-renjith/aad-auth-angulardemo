import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import {MatTableDataSource} from '@angular/material/table';
import { JsonTypes } from '@azure/msal-common/dist/utils/Constants';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteExamDialogComponent } from '../delete-exam-dialog/delete-exam-dialog.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-exams',
  templateUrl: './list-exams.component.html',
  styleUrls: ['./list-exams.component.scss']
})
export class ListExamsComponent implements OnInit {

  listSkills! : any;
  examId: any;
  state:any;
  displayedColumns = ['examName', 'skillName', 'examDate','expiryDate','CertificateImage','actions'];
  dataSource = this.listSkills; 
 

  constructor(private skillService: SkillService,public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router) {

   }
   redirectToEditExam(skillDetailId: string , examDetailId:string , examName:string , examDate: string, expiryDate: string,img:string,fname:string){
    console.log(skillDetailId,examDetailId,examName);
    this._router.navigate(['editExam'],{state:{skillDetailId,examDetailId,examName,examDate,expiryDate,img,fname}});
   }

   openDialog(enterAnimationDuration: string, exitAnimationDuration: string,examId: string): void {
    console.log(examId);
    const dialogRef = this.dialog.open(DeleteExamDialogComponent, {
      width: '250px',
      enterAnimationDuration
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if(result == 'yes')
      {
        console.log(result);
        this.skillService.deleteExam(examId).subscribe({next:data => {
      
          this._snackBar.open("Certification deleted successfully");
          //this._router.navigate(['list']);
          location.reload()
       
        }, error: err => {
          this._snackBar.open("Unable to delete the certification");
          this._router.navigate(['listExam']);
          
        }});
      }
    });
  }
 

  ngOnInit(): void {    
    // this.listSkills this.skillService.listskill();
    this.skillService.listExam().subscribe((data: any) => {
      this.dataSource=new  MatTableDataSource(data)
     
      
  });  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  redirectToAddExam()
  {
    this._router.navigate(['addExam']);
  }

  
  formatDate()
  {

  }

  getURL(img:any){
    let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
    reader.addEventListener("load", () => {
       return reader.result; // here is the result you got from reader
    }, false);
 
    if (img) {
       reader.readAsDataURL(img);
    }

  }

}

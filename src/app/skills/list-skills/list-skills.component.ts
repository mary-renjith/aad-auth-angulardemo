import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import {MatTableDataSource} from '@angular/material/table';
import { JsonTypes } from '@azure/msal-common/dist/utils/Constants';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.scss']
})

export class ListSkillsComponent implements OnInit {

  listSkills! : any;
  skillDetailId: any;
  state:any;
  displayedColumns = ['SkillName', 'SkillLevel', 'SkillYrsOfExp','actions'];
  dataSource = this.listSkills; 
 

  constructor(private skillService: SkillService,public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router) {

   }
   redirectToEditSkill(skillDetailId: string, skillLevel:string , skillYrsExp: string, skillId: string){
    
    this._router.navigate(['update'],{state:{skillDetailId,skillLevel,skillYrsExp,skillId}});
   }
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string,SkillDetailsId: string): void {
    console.log(SkillDetailsId);
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '250px',
      enterAnimationDuration
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if(result == 'yes')
      {
        console.log(result);
        this.skillService.deleteSkill(SkillDetailsId).subscribe({next:data => {
      
          this._snackBar.open("Skill deleted Successfully");
          //this._router.navigate(['list']);
          location.reload()
       
        }, error: err => {
          this._snackBar.open("Unable to delete the Skill");
          this._router.navigate(['list']);
          
        }});
      }
    });
  }
 

  ngOnInit(): void {    
    // this.listSkills this.skillService.listskill();
    this.skillService.listskill().subscribe((data: any) => {
      this.dataSource=new  MatTableDataSource(data)
      
  });  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  
}

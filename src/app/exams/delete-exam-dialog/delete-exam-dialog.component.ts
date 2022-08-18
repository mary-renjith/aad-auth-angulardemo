import { Component, OnInit } from '@angular/core';
import { ListExamsComponent } from '../list-exams/list-exams.component';

@Component({
  selector: 'app-delete-exam-dialog',
  templateUrl: './delete-exam-dialog.component.html',
  styleUrls: ['./delete-exam-dialog.component.scss']
})
export class DeleteExamDialogComponent implements OnInit {
  examDetailId: any;
  constructor() { }

  ngOnInit(): void {
  }

  delete()
  {
    
  }

}

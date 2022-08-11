import { Component, OnInit } from '@angular/core';
import { ListSkillsComponent } from '../list-skills/list-skills.component';


@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {
  skillID: any;
  constructor(
    
   ) {
   
    }

  ngOnInit(): void {
  }
  delete()
  {
    
  }
}

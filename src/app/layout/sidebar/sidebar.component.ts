import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  redirectListSkill(){
    this._router.navigate(['list']);
  }
  redirectListExam()
  {
    this._router.navigate(['listExam']);
  }

}

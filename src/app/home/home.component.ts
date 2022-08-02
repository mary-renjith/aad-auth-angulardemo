import { Component, OnInit } from '@angular/core';
import { AzureaddemoService } from '../azureaddemo.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn:boolean=false;
  constructor(private azureAddDemoService:AzureaddemoService) { 
    
  }


  ngOnInit(): void {
    this.azureAddDemoService.isUserLoggedIn.subscribe(
      x=>{
        this.isUserLoggedIn=x;
      }
    )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  
  baseUrl: string ='https://skillportalwebapi.azurewebsites.net/api/Skill/api/';
  constructor(private http: HttpClient) { }
  listskill(){

      return this.http.get(this.baseUrl + 'GetAllSkills/mary.renjith19@gmail.com');
  }
  listSkillName()
  { 

      return this.http.get(this.baseUrl + 'GetSkillNames');
  
  }
}

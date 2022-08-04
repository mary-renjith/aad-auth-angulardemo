import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  
  baseUrl: string ='http://localhost:5288/api/Skill?UserId=mary.renjith@gmail.com';
  constructor(private http: HttpClient) { }
  listskill(){

      return this.http.get(this.baseUrl);
  }
}

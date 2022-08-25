import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})

export class SkillService {
 
   //baseUrl: string ='http://localhost:5288/api/Skill/api/';
   baseUrl: string =' https://skillportalwebapi.azurewebsites.net/api/Skill/api/';
 
  constructor(private http: HttpClient) { }
  listskill(){

      return this.http.get(this.baseUrl + 'GetAllSkills/?UserId=' + 'mary.renjith19@gmail.com');
  }

  listExam(){

    return this.http.get(this.baseUrl + 'GetAllExams/?UserId=' + 'mary.renjith19@gmail.com');
  }
  listSkillName()
  {       
      return this.http.get(this.baseUrl + 'GetSkillNames');
      // return this.http.jsonp(this.baseUrl + 'GetSkillNames', 'callback').pipe(); // then handle the error     
  
  }
  listaAddedSkillNames()
  {       
      return this.http.get(this.baseUrl + 'GetAddedSkillNames/?userId='+'mary.renjith19@gmail.com');
      // return this.http.jsonp(this.baseUrl + 'GetSkillNames', 'callback').pipe(); // then handle the error     
  
  }
  addSkill(skillObj: any ){

    const headers = { 'content-type': "application/json"} ;
    const body=JSON.stringify(skillObj);
    return this.http.post(this.baseUrl + 'AddSkillDetails/'+body,body,httpOptions); 
       
  }

  addExam(examObj: any ){
   
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    //const headers = { 'content-type': "application/json"} ;  

    const body=JSON.stringify(examObj);
    //console.log(this.baseUrl + 'addExamDetails/' + examObj);
    return this.http.post(this.baseUrl + 'addExamDetails/' + body , body ,httpOptions); 
  }

  deleteSkill(SkillDetailsId: any ){
    const headers = { 'content-type': "application/json"} ;
    const body= '?UserId=mary.renjith19@gmail.com&skillDetailsId='+SkillDetailsId;
    return this.http.post(this.baseUrl + 'deleteSkillDetails/'+ body,httpOptions);    
        
  }

  deleteExam(ExamDetailsId: any ){
    const headers = { 'content-type': "application/json"} ;
    const body= '?UserId=mary.renjith19@gmail.com&examDetailsId='+ExamDetailsId;
    return this.http.post(this.baseUrl + 'deleteExamDetails/'+ body,httpOptions);    
        
  }

  editSkill(skillObj: any ){
    console.log(skillObj);
    const headers = { 'content-type': "application/json"} ;
    const body=JSON.stringify(skillObj);
    //console.log(body);
    return this.http.post(this.baseUrl + 'AddSkillDetails/'+body,body,httpOptions);    
  }

  checkSkill(skillId:any){

    const body= '?UserId=mary.renjith19@gmail.com&skillId='+skillId;
    return this.http.get(this.baseUrl + 'checkSkillAdded/' + body);
}
}

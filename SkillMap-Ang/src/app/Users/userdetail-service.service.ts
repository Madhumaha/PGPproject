import { Injectable } from '@angular/core';
import { User } from '../Model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailServiceService {
  readonly Rest_URL="http://localhost:8080/SkillMapMiddleware";
  userData:User;
  users:User[];
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]>
  {
    console.log('get userlist from service');
    return this.http.get<User[]>(this.Rest_URL+'/allusers');
    
  }

  // getUserById():Observable<any>
  // {
  //   let params1=new HttpParams().set('empid','1')
  //   return this.http.get(this.Rest_URL+'/getuser/'+{params:params1});
  // }

  saveUser(userData:User):Observable<User>{
    return this.http.post<User>(this.Rest_URL+'/registerUser',userData);
  }

  editUser(userData:User):Observable<any>{
    return this.http.put(this.Rest_URL+'/updateuser',userData);
  }

  deleteUser(id:number){
    return this.http.delete(this.Rest_URL+'/deleteuser/'+id);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  urlend:string='https://jsonplaceholder.typicode.com/users/';

  constructor(private httpclient:HttpClient) { }
  getUsers(){
    return this.httpclient.get(this.urlend);
  }
  getUsersDetails(id:any){
    return this.httpclient.get(this.urlend+`${id}`);
  }
  saveUsersDetails(userdata:any){
    return this.httpclient.post(this.urlend,userdata);
  }
  updateUsersDetails(id:any,userdata:any){
    return this.httpclient.put(this.urlend+`${id}`,userdata);
  }
  removeUsersDetails(id:any){
    return this.httpclient.delete(this.urlend+`${id}`);
  }
}

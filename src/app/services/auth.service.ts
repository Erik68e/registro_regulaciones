import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:4200/api'; // Adjust this URL to your backend API

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: string): Observable<any> {
    const url = `${this.baseUrl}/registro`;
    return this.http.post(url, user);
  }

  loginUser(user: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, user);
  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem("token");
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

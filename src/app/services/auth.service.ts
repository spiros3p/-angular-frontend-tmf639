import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/User';
import { loginResponse } from 'src/app/models/loginResponse';
import { signupResponse } from 'src/app/models/signupResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basePath = environment.authUrl + '/auth';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }
    ),
  };

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): Observable<any> {
    return this.http.post<any>(`${this.basePath}/isAuthenticated`, this.httpOptions);
  }

  isAdmin(): Observable<any> {
    return this.http.post<any>(`${this.basePath}/isAdmin`, this.httpOptions);
  }

  signup(user: Omit<User, "id" | "accepted" | "admin">): Observable<signupResponse> {
    return this.http.post<signupResponse>(`${this.basePath}/signup`, user, this.httpOptions);
  }

  login(email: string, password: string): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.basePath}/login`, { email, password }, this.httpOptions);
  }

  logout(): Observable<signupResponse> {
    return this.http.post<signupResponse>(`${this.basePath}/logout`, this.httpOptions);
  }


}

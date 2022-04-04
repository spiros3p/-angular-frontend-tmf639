import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/User';
import { loginResponse } from 'src/app/models/loginResponse';
import { signupResponse } from 'src/app/models/signupResponse';
import { logoutResponse } from '../models/logoutResponse';

/**
 * This service is used to authenticate and authorize requests and routes with the backend web server
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Angular environment variable. States the URL of the web server that the SPA connects for auth
   */
  private basePath = environment.authUrl + '/auth';

  /**
   * Sets the "Content-Type" headers for each request in this file
   */
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }
    ),
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Sends POST request to check if the user is authenticated or if the session is expired
   * Used in Authguard for route protecting
   * @returns an observable
   */
  isAuthenticated(): Observable<any> {
    return this.http.post<any>(`${this.basePath}/isAuthenticated`, this.httpOptions);
  }

  /**
   * Sends POST request to check if the user has Admin rights to access certain routes
   * Used in Adminguard for route protecting
   * @returns an observable
   */
  isAdmin(): Observable<any> {
    return this.http.post<any>(`${this.basePath}/isAdmin`, this.httpOptions);
  }

  /**
   * Sends POST request with the user data for signup
   * @returns an observable
   */
  signup(user: Omit<User, "id" | "accepted" | "admin">): Observable<signupResponse> {
    return this.http.post<signupResponse>(`${this.basePath}/signup`, user, this.httpOptions);
  }

  /**
   * Sends POST request with the user data to Login
   * @returns an observable
   */
  login(email: string, password: string): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.basePath}/login`, { email, password }, this.httpOptions);
  }

  /**
   * Sends POST request to log out the user from the session with the server
   * @returns an observable
   */
  logout(): Observable<logoutResponse> {
    return this.http.post<logoutResponse>(`${this.basePath}/logout`, this.httpOptions);
  }
}

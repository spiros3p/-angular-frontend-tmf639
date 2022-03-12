import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

/**
 * This Service is used to send http request to the backend server to manage users
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basePath = environment.authUrl + '/admin';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }
    )
  };

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * 
   * @returns Observable - Array of U
   */
  getUsers(): Observable<User[]> {
    const url = `${this.basePath}/users`;
    return this.http.get<User[]>(url, this.httpOptions);
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.basePath}/users/${user.id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  toggleUserAccepted(id: number, data: boolean): Observable<User> {
    const url = `${this.basePath}/users/${id}`;
    return this.http.patch<User>(url,  { "accepted": data }, this.httpOptions);
  }

}

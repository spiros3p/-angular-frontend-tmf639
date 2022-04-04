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

  /**
   * the URL that the HTTP requests are sent
   * environment variable
   */
  private basePath = environment.authUrl + '/admin';

  /**
   * constructs the HTTP headers to send with each request
   */
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }
    )
  };

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Calls a GET HTTP request to fetch all the users from the database of the web server
   * @returns Observable - Array of Users
   */
  getUsers(): Observable<User[]> {
    const url = `${this.basePath}/users`;
    return this.http.get<User[]>(url, this.httpOptions);
  }

  /**
   * Calls a DELETE HTTP request to remove the specified, by ID, user from the db of the web server
   * @param {User} user interface defined
   * @returns an Observable type User
   */
  deleteUser(user: User): Observable<User> {
    const url = `${this.basePath}/users/${user.id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  /**
   * Calls a PATH HTTP request to update the specified, by ID, user on the db of the web server
   * @param id the id of the specified user
   * @param data the user.accepted attribute-value pair of the User object
   * @returns 
   */
  toggleUserAccepted(id: number, data: boolean): Observable<User> {
    const url = `${this.basePath}/users/${id}`;
    return this.http.patch<User>(url,  { "accepted": data }, this.httpOptions);
  }

}

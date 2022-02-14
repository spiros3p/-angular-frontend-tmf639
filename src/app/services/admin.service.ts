import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from 'model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basePath = environment.authUrl + '/admin';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }
    ),
  };

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<User[]> {
    const url = `${this.basePath}/users`;
    return this.http.get<User[]>(url, this.httpOptions);
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.basePath}/users/${user.id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  toggleUserAccepted(user: User): Observable<User> {
    const url = `${this.basePath}/users/${user.id}/accepted`;
    return this.http.patch<User>(url, this.httpOptions);
  }

}

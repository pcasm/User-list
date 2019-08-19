import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  configUrl = 'https://jsonplaceholder.typicode.com/users';

  getData(): Observable<any> {
    return this.http.get(this.configUrl);
  }

  createUser(_name, _username, _email, _street, _suite, _city, _zip, _phone, _website, _company_name, _company_catch_phrase, _company_bs): Observable<any> {
    const body = {
      name: _name,
      username: _username,
      email: _email,
      address: {street: _street, suite: _suite, city: _city, zipcode: _zip, geo: {lat: '0', lng: '0'}},
      phone: _phone,
      website: _website,
      company: {name: _company_name, catchPhrase: _company_catch_phrase, bs: _company_bs}
    };
    return this.http.post(this.configUrl, body);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.configUrl}/${id}`;
    return this.http.delete(url);
  }
}

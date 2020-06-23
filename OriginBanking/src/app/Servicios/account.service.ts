import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../Models/card';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiURL = "https://localhost:44312/api/Cards"; 

  constructor(private http: HttpClient) { }


  ExistAndIsNotBlocked(Card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiURL + "/ExistAndIsNotBlocked",Card);

  }

  EnterPin(Card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiURL + "/EnterPin",Card);

  }


  GetUser(cardnumber: string): Observable<User> {
    return this.http.get<User>(this.apiURL + '/'+ cardnumber);

  } 

  GetToken(): string {
    return localStorage.getItem("token");
  }

  GetExpirationToken(): string {
    return localStorage.getItem("tokenExpiration");
  }

  
  IsLogged(): boolean {
    var exp = this.GetExpirationToken();

    if (!exp) {
      return false;
    }

    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return false;
    } else {
      return true;
    }
    
  }
}

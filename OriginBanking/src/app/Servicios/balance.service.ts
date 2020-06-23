import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../Models/card';
import { Observable } from 'rxjs';
import { Balance } from '../Models/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private apiURL = "https://localhost:44365/api/Balance"; 

  constructor(private http: HttpClient) { }


  GetMoney(Card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiURL + "/GetMoney",Card);

  }

  GetBalance(cardnumber: string): Observable<Balance[]> {
    return this.http.get<Balance[]>(this.apiURL + '/'+ cardnumber);

  }
}

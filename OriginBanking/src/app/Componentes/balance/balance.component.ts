import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Balance } from 'src/app/Models/balance';
import { BalanceService } from 'src/app/Servicios/balance.service';
import { User } from 'src/app/Models/user';
import { AccountService } from 'src/app/Servicios/account.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  displayedColumns = ['operation', 'monto', 'numero', 'date'];
  firstname: string;
  lastname: string;
  balance: string;

  dataSource: MatTableDataSource<Balance>;
  constructor
  (
    private Service: BalanceService,
    private ServiceAccount: AccountService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.GetData();
    this.GetUser();

  }

  GetData() {
  return this.Service.GetBalance(localStorage.getItem("Number")).subscribe(d => this.dataSource = new MatTableDataSource<Balance>
   (d.sort((a,b) => { return (a.date > b.date) ? 1 : -1})),
   error => this.ShowError(error)); 
  } 

GetUser() {
  return this.ServiceAccount.GetUser(localStorage.getItem("Number")).subscribe(u => this.SetInformationUser(u),
   error => this.ShowError(error)); 
} 


  ShowError(error) {
    this.snackBar.open("Ha ocurrido un error", '', {
      duration: 3000,
    }); 
        
  }

      SetInformationUser(User: User) {
        this.firstname = User.firstname;
        this.lastname = User.lastname;
        this.balance = User.balance;
      }

}

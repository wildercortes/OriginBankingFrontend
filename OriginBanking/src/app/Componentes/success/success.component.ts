import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/Servicios/account.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  firstname: string;
  lastname: string;
  balance: string;
  monto: string;
  date: Date;
  cuenta: string;

  constructor
  (
    public snackBar: MatSnackBar,
    private ServiceAccount: AccountService,
  ) 
  { }

  ngOnInit(): void {
    this.GetUser();
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
        this.date = new Date();
        this.cuenta = localStorage.getItem("Number");
        
        this.monto = localStorage.getItem("Monto");
      }

}

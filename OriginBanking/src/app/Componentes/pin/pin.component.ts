import { Component, OnInit, Inject } from '@angular/core';
import Keyboard from 'simple-keyboard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Card } from 'src/app/Models/card';
import { AccountService } from 'src/app/Servicios/account.service';

@Component({
  selector: 'PIN',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  Attempts: number = 3;
  CardNumber: string = "";
  value = "";
  valueJustNumber = "";
  keyboard: Keyboard;
  formGroup: FormGroup;
  TouchInput: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private Service: AccountService,
    public snackBar: MatSnackBar,
    private router: Router
  
      ) { }

  ngOnInit(): void {
     this.InitializeForm(); 
     this.keyboard = new Keyboard({      
      onChange: button => this.onChange(button) 
     });
   }
 
   InitializeForm() {
     this.formGroup = this.fb.group({
        pin: [ '',[Validators.required,Validators.pattern('[0-9\-\]{4}')]], 

      })
  }

  GetCardNumber(){
   this.CardNumber = localStorage.getItem("Number");
   localStorage.setItem('Number', "0");
    }



  Enviar(card: Card) {
     card.number = localStorage.getItem("Number");
      card.Attempts = this.Attempts;
      this.Service.EnterPin(card).subscribe(token => this.GetToken(token, card),
      error => this.ShowError(error)); 
  }

  RedirectToOperations(card: Card){
  localStorage.setItem('Number', card.number);
  this.router.navigate(["/Operations"])
  }

  GetToken(token, card: Card) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    localStorage.setItem('Number', card.number);
    this.router.navigate(["/Operations"])
  }

  ShowError(error) {
    this.Attempts--;

    if(error.status == 400)
    {
      this.snackBar.open(error.error, '', {
        duration: 3000,
      }); 
    }else{
      this.snackBar.open("Ha ocurrido un error", '', {
        duration: 3000,
      }); 
    }

    if(error.error == "Tu Cuenta ha sido bloqueda")
    {
     /*  this.router.navigate(["/Tarjeta"]) */
      window.location.replace('/Tarjeta');
    }
    
  }
  Clean(){
    this.formGroup.controls['pin'].patchValue("");
    this.keyboard.setInput("");
  }

  onChange = (value: string) => {
    this.formGroup.controls['pin'].patchValue(value);
  };

  Return(){
    window.location.replace('/Tarjeta');
  }

 


}

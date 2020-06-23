import { Component, OnInit } from '@angular/core';
import Keyboard from 'simple-keyboard';
import { Card } from 'src/app/Models/card';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { AccountService } from 'src/app/Servicios/account.service';

@Component({
  selector: 'Tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  value = "";
  valueJustNumber = "";
  keyboard: Keyboard;
  formGroup: FormGroup;
  TouchInput: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private Service: AccountService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
      ) { }

  ngOnInit(): void {
    
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    this.InitializeForm();
    this.keyboard = new Keyboard({      
      onChange: button => this.onChange(button) 
     });

   }
 
   InitializeForm() {
     this.formGroup = this.fb.group({
        card: [ '',[Validators.required,Validators.pattern('[0-9\-\]{19}')]], 

      })
  }



  Enviar(card: Card) {
    card.number = this.valueJustNumber.replace(/-/g, "");
      this.Service.ExistAndIsNotBlocked(card).subscribe(x => this.RedirectToPin(card),
      error => this.Error(error));
  }


  Error(error) {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '540px',
      data: error.error
    });  
     
  }


  RedirectToPin(card: Card){
  localStorage.setItem('Number', card.number);
  window.location.replace('/PIN');
 /*  this.router.navigate(["/PIN"]) */
  }

  ShowError(error) {
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
    
  }
  Clean(){
    this.formGroup.controls['card'].patchValue("");
    this.keyboard.setInput("");
  }

  onChange = (value: string) => {
      
    let grupo: number = 3
    let contador: number = 0;

    let AuxValor: string = "";

    for (let numero of value){
      contador++;
      if(contador == 4 && grupo != 0){
        AuxValor += numero += "-";
        grupo--;
       contador = 0;
      }else{
        AuxValor += numero;
        this.valueJustNumber = AuxValor;
      }
      
    }

    this.formGroup.controls['card'].patchValue(AuxValor);
  };


}

import { Component, OnInit } from '@angular/core';
import Keyboard from 'simple-keyboard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Card } from 'src/app/Models/card';
import { BalanceService } from 'src/app/Servicios/balance.service';
import { ErrorComponent } from '../error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent implements OnInit {

  CardNumber: string = "";
  value = "";
  valueJustNumber = "";
  keyboard: Keyboard;
  formGroup: FormGroup;
  TouchInput: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private Service: BalanceService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  
      ) { }

  ngOnInit(): void {
     this.InitializeForm(); 
   }
 
   InitializeForm() {
     this.formGroup = this.fb.group({
      monto: [ '',[Validators.required,Validators.pattern("^[0-9]+$")]], 

      })
  }


  ngAfterViewInit() {
    this.keyboard = new Keyboard({      
     onChange: button => this.onChange(button) 
    });
  } 


   Enviar(card: Card) {
    card.number = localStorage.getItem("Number");
     this.Service.GetMoney(card).subscribe(x => this.RedirectToSuccess(card),
     error => this.Error(error)); 
 }

  RedirectToSuccess(card: Card){
  localStorage.setItem('Number', card.number);
  localStorage.setItem('Monto', card.monto);
  this.router.navigate(["/Success"])
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
    this.formGroup.controls['monto'].patchValue("");
    this.keyboard.setInput("");
  }

  onChange = (value: string) => {
    this.formGroup.controls['monto'].patchValue(value);
  };

  Error(error) {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '540px',
      data: error.error
    });  
     
  }

 


}

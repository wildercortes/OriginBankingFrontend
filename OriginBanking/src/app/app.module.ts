import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BalanceComponent } from './Componentes/balance/balance.component';
import { ErrorComponent } from './Componentes/error/error.component';
import { OperationsComponent } from './Componentes/operations/operations.component';
import { PinComponent } from './Componentes/pin/pin.component';
import { RetiroComponent } from './Componentes/retiro/retiro.component';
import { SuccessComponent } from './Componentes/success/success.component';
import { TarjetaComponent } from './Componentes/tarjeta/tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceComponent,
    ErrorComponent,
    OperationsComponent,
    PinComponent,
    RetiroComponent,
    SuccessComponent,
    TarjetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

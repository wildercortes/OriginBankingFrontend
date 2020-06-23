import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PinComponent } from './Componentes/pin/pin.component';
import { TarjetaComponent } from './Componentes/tarjeta/tarjeta.component';
import { OperationsComponent } from './Componentes/operations/operations.component';
import { BalanceComponent } from './Componentes/balance/balance.component';
import { RetiroComponent } from './Componentes/retiro/retiro.component';
import { SuccessComponent } from './Componentes/success/success.component';
import { ErrorComponent } from './Componentes/error/error.component';
import { AuthInterceptorService } from './Servicios/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    TarjetaComponent,
    OperationsComponent,
    BalanceComponent,
    RetiroComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    HttpClientModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers:
   [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

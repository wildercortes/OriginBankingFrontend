import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetaComponent } from './Componentes/tarjeta/tarjeta.component';
import { PinComponent } from './Componentes/pin/pin.component';
import { OperationsComponent } from './Componentes/operations/operations.component';
import { BalanceComponent } from './Componentes/balance/balance.component';
import { RetiroComponent } from './Componentes/retiro/retiro.component';
import { SuccessComponent } from './Componentes/success/success.component';
import { ErrorComponent } from './Componentes/error/error.component';
import { AuthGuardService } from './Servicios/auth-guard.service';


const routes: Routes = 
[
  { path: '', component: TarjetaComponent , pathMatch: 'full' }, 
  { path: 'PIN', component: PinComponent},
  { path: 'Tarjeta', component: TarjetaComponent},
  { path: 'Operations', component: OperationsComponent, canActivate: [AuthGuardService]}, 
  { path: 'Balance', component: BalanceComponent, canActivate: [AuthGuardService]},
  { path: 'Retiro', component: RetiroComponent, canActivate: [AuthGuardService]},
  { path: 'Success', component: SuccessComponent, canActivate: [AuthGuardService]},
  { path: 'Error', component: ErrorComponent, canActivate: [AuthGuardService]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

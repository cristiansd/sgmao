import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrincipalComponent} from './principal/principal.component';
import {RecursosComponent} from './recursos/recursos.component';
import {ClientesComponent} from './clientes/clientes.component';
import {TiposComponent} from './tipos/tipos.component';
import {OrdenesComponent} from './ordenes/ordenes.component';

const routes: Routes = [
  {path:'', redirectTo: '/principal', pathMatch: 'full'},
  {path: 'principal', component: PrincipalComponent},
  {path: 'recursos', component: RecursosComponent },
  {path: 'clientes', component: ClientesComponent},
  {path: 'tipos', component: TiposComponent},
  {path : 'ordenes', component: OrdenesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

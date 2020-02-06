import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard
import { AuthGuard } from './guards/auth.guard';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HeroesComponent } from './components/heroes/heroes.component';


const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Si no existe la ruta se redirije al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

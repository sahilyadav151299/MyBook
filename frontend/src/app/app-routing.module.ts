import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signUp/signUp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'signup', component: SignUpComponent},

  {path: 'login', component: LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents ={LoginComponent,SignUpComponent}
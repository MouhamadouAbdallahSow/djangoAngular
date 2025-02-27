import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { AuthComponent } from './auth/auth.component';
import { UserTypeComponent } from './user-type/user-type.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},// Redirig auth/ vers auth/login/
      { path: 'login', component: SeConnecterComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'user-type', component: UserTypeComponent},
      { path: '**', redirectTo: 'login' }, // Redirection pour les routes invalides auth/--- vers auth/login/ */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}

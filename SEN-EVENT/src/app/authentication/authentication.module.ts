import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { UserTypeComponent } from './user-type/user-type.component';

@NgModule({
  declarations: [CreateAccountComponent, SeConnecterComponent, AuthComponent, UserTypeComponent],
  imports: [CommonModule, AuthenticationRoutingModule, FormsModule, SharedModule],
})
export class AuthenticationModule {}

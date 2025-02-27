import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ContactComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [NavbarComponent, FooterComponent, ContactComponent],
})
export class SharedModule {}

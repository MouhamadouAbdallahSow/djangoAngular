import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageRoutingModule } from './homepage-routing.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ContactComponent } from '../shared/contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { SharedModule } from '../shared/shared.module';
import { EventsCardComponent } from './events-card/events-card.component';
import { TemoignagesComponent } from './temoignages/temoignages.component';
import { EventsModule } from '../events/events.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AboutComponent,
    HeaderComponent,
    PageAcceuilComponent,
    EventsCardComponent,
    TemoignagesComponent,
  ], // Ajoutes les composantes dans cette declarations
  imports: [
    CommonModule,
    HomepageRoutingModule,
    SharedModule,
    EventsModule,
    RouterModule,
  ],
})
export class HomepageModule {}

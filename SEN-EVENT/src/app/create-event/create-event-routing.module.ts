import { CreateEventComponent } from './create-event/create-event.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditerComponent } from './editer/editer.component';
import { BanniereComponent } from './banniere/banniere.component';
import { TicketComponent } from './ticket/ticket.component';
import { ReviserComponent } from './reviser/reviser.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEventComponent,
    children: [
      { path: 'editer', component: EditerComponent },
      { path: 'banner', component: BanniereComponent },
      { path: 'ticket', component: TicketComponent },
      { path: 'reviser', component: ReviserComponent },
      { path: '**', redirectTo: 'editer' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEventRoutingModule {}

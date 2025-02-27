import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { PageDesEventsComponent } from './page-des-events/page-des-events.component';
import { EventPageComponent } from './event-page/event-page.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '**', redirectTo: 'Evenements' }, // Déplacer cette ligne en haut
      { path: 'Evenements', component: PageDesEventsComponent },
      { path: 'evenement', component: EventPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}

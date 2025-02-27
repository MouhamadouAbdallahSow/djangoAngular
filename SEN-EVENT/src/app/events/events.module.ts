import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventPageComponent } from './event-page/event-page.component';
import { PageDesEventsComponent } from './page-des-events/page-des-events.component';
import { EventsComponent } from './events/events.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EventPageComponent, PageDesEventsComponent, EventsComponent],
  imports: [CommonModule, EventsRoutingModule, SharedModule, RouterModule],
})
export class EventsModule {}

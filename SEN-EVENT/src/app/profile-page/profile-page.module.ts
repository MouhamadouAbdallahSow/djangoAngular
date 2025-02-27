import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
import { CreatorProfileComponent } from './creator-profile/creator-profile.component';

import { ProfilesPageComponent } from './profile-pages/profile-page.component';
import { Profil2Component } from './profil2/profil2.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProfilesPageComponent,
    CreatorProfileComponent,
    VisitorProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    Profil2Component,
    SharedModule,
  ],
})
export class ProfilePageModule {}

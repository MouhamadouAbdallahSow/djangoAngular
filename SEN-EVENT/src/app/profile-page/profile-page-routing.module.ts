import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
import { CreatorProfileComponent } from './creator-profile/creator-profile.component';
import { ProfilesPageComponent } from './profile-pages/profile-page.component';
import { Profil2Component } from './profil2/profil2.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesPageComponent,
    children: [
      { path: 'creator', component: CreatorProfileComponent },
      { path: 'profil_visit', component: Profil2Component },
      { path: 'visitor', component: VisitorProfileComponent },
      { path: '', redirectTo: 'visitor', pathMatch: 'full' },
      { path: '**', redirectTo: '/homepage' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}

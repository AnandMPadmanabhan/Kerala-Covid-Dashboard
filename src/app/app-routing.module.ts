import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { StateWisedashboardComponent } from './state-wisedashboard/state-wisedashboard.component';
import { TotalDashboardComponent } from './total-dashboard/total-dashboard.component';

const routes: Routes = [
  { path: '', component: TotalDashboardComponent},
  { path: 'home', component: TotalDashboardComponent },
  { path: 'districts', component: StateWisedashboardComponent },
  { path: 'district/:district', component: DistrictComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

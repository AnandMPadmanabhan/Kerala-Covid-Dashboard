import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TotalDashboardComponent } from './total-dashboard/total-dashboard.component';
import { StateWisedashboardComponent } from './state-wisedashboard/state-wisedashboard.component';
import { FormsModule } from '@angular/forms';
import { DistrictComponent } from './district/district.component';
import { ChartsModule } from 'ng2-charts';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TotalDashboardComponent,
    StateWisedashboardComponent,
    DistrictComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

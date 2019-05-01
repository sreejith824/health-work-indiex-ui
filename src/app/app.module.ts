import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatDialogModule, MatInputModule, MatSliderModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HealthworkindexComponent } from './healthworkindex/healthworkindex.component';
import { LoginComponent } from './login/login.component';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    HealthworkindexComponent,
    LoginComponent,
    TeamDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    MatButtonModule, 
    MatCheckboxModule, 
    MatIconModule, 
    MatDialogModule, 
    MatInputModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

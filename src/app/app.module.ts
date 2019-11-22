import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { UploadComponent } from './upload/upload.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { TopComponent } from './top/top.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { OddsSimulationComponent } from './odds-simulation/odds-simulation.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    AnalysisComponent,
    TopComponent,
    PageNotFoundComponent,
    OddsSimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

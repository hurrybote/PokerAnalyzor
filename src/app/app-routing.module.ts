import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { OddsSimulationComponent } from './odds-simulation/odds-simulation.component';

// **のpathでその前にあるpath以外が選択された場合は404エラー
const routes: Routes = [
  { path: '', component: OddsSimulationComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

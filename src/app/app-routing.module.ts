import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dow30Component } from './dow30/dow30.component';

const routes: Routes = [
  { path: '', redirectTo: '/dow30', pathMatch: 'full' },
  { path: 'dow30', component: Dow30Component },
  { path: 'main', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

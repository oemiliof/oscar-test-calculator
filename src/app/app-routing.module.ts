import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'economic-indicator',
    loadChildren: () =>
      import('./components/economic-indicator/economic-indicator.module').then(
        (m) => m.EconomicIndicatorModule
      ),
  },
  { path: '', redirectTo: '/economic-indicator', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

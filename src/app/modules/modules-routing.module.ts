import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'customers', pathMatch: 'full', redirectTo: '/modules/customers' },
  { path: 'loans', pathMatch: 'full', redirectTo: '/modules/loans' },
  { path: 'payments', pathMatch: 'full', redirectTo: '/modules/payments' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}

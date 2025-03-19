import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'modules/customers', pathMatch: 'full' },
  {
    path: 'modules',
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'loans',
        loadChildren: () =>
          import('./modules/loans/loans.module').then((m) => m.LoansModule),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./modules/payments/payments.module').then((m) => m.PaymentsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

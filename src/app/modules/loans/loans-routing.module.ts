import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';

const routes: Routes = [
  { path: '', component: LoanListComponent },
  { path: 'list', component: LoanListComponent },
  { path: 'add', component: LoanFormComponent },
  { path: 'edit/:id', component: LoanFormComponent },
  { path: 'details/:id', component: LoanDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule {}

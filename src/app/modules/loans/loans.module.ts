import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoanListComponent,
    LoanFormComponent,
    LoanDetailsComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoansModule { }

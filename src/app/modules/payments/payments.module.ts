import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PaymentsRoutingModule, // ✅ Make sure this is imported
    FormsModule
  ]
})
export class PaymentsModule {}

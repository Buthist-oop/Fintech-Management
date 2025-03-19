import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../payment.service';
import { LoanService, Loan } from '../../loans/loan.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  loans: Loan[] = [];
  selectedLoanId: number | null = null;
  selectedInstallment: number | null = null;
  amountPaid!: number;
  paymentDate!: string;
  schedule: any[] = [];

  constructor(private paymentService: PaymentService, private loanService: LoanService) {}

  ngOnInit(): void {
    this.loans = this.loanService.getLoans();
  }

  onLoanChange(): void {
    if (this.selectedLoanId) {
      this.loadInstallments();
    }
}

loadInstallments(): void {
    if (this.selectedLoanId) {
      console.log("Selected Loan ID:", this.selectedLoanId);
      
      let allSchedules = this.loanService.getLoanSchedules();
      console.log("All Schedules from LocalStorage:", allSchedules);

      // Only show "Pending" installments
      this.schedule = this.loanService.getScheduleByLoanId(this.selectedLoanId)
        .filter(inst => inst.status === 'Pending');

      console.log("Filtered Installments:", this.schedule);
    }
}

makePayment(): void {
    if (!this.selectedLoanId || !this.selectedInstallment || !this.amountPaid || !this.paymentDate) {
      alert('Please fill in all fields.');
      return;
    }

    const newPayment: Payment = {
      id: new Date().getTime(),
      loanId: this.selectedLoanId,
      installmentNumber: this.selectedInstallment,
      amountPaid: this.amountPaid, // ✅ Ensuring amountPaid is correctly used
      paymentDate: this.paymentDate
    };

    this.paymentService.makePayment(newPayment);
    alert('Payment recorded successfully!');
}

}

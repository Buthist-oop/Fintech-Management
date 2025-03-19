import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../payment.service';
import { LoanService, Loan } from '../../loans/loan.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  loans: Loan[] = [];

  constructor(private paymentService: PaymentService, private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loans = this.loanService.getLoans();
    console.log("✅ Loaded Loans:", this.loans);
    this.loadPayments(); // Load payments AFTER loans are available
  }

  loadPayments(): void {
    this.payments = this.paymentService.getPayments();
    console.log("✅ Loaded Payments:", this.payments);
  }

  getLoanDetails(loanId: number): string {
    console.log("🔍 Checking Loan ID:", loanId, "against loans:", this.loans);

    const loan = this.loans.find(l => Number(l.id) === Number(loanId));
    
    return loan ? `Loan #${loan.id} - ${loan.loanType}` : 'Unknown Loan';
  }
}

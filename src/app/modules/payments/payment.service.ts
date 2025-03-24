import { Injectable } from '@angular/core';
import { LoanService } from '../loans/loan.service';

export interface Payment {
  id: number;
  loanId: number;
  installmentNumber: number;
  amountPaid: number;
  paymentDate: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentsKey = 'payments';

  constructor(private loanService: LoanService) {}

  // Get all payments from localStorage
  getPayments(): Payment[] {
    return JSON.parse(localStorage.getItem(this.paymentsKey) || '[]');
  }

  // Get payments for a specific loan
  getPaymentsByLoanId(loanId: number): Payment[] {
    return this.getPayments().filter(payment => payment.loanId === loanId);
  }

  makePayment(payment: Payment): void {
    let payments = this.getPayments();
    payment.id = new Date().getTime();
    payments.push(payment);
    localStorage.setItem(this.paymentsKey, JSON.stringify(payments));

    console.log("💰 Processing Payment:", payment);

    // Pass the correct paid amount
    this.loanService.markInstallmentAsPaid(payment.loanId, payment.amountPaid);

    // ✅ Force re-fetch schedules from LocalStorage
    setTimeout(() => {
      console.log("🔍 Loan Schedules after Payment:", this.loanService.getLoanSchedules());
    }, 100);
}

  markInstallmentAsPaid(loanId: number, installmentNumber: number): void {
  console.log(`⚡ markInstallmentAsPaid CALLED for Loan ID: ${loanId}, Installment: ${installmentNumber}`);
  }
  
}

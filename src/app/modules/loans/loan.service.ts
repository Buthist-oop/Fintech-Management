import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface Loan {
  id: number;
  customerId: number;
  loanType: string;
  loanAmount: number;
  interestRate: number;
  duration: number; // in months
  startDate: string;
  status: 'Active' | 'Paid';
}

export interface LoanSchedule {
  loanId: number;
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: 'Pending' | 'Paid';
  remainingAmount: number; 
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loansKey = 'loans';
  private schedulesKey = 'loanSchedules';
  installmentUpdated = new EventEmitter<void>(); // ✅ Notify UI after installment update

  constructor(private router: Router) {}

  getLoans(): Loan[] {
    return JSON.parse(localStorage.getItem(this.loansKey) || '[]');
  }

  getLoanById(id: number): Loan | null {
    return this.getLoans().find(loan => loan.id === id) || null;
  }

  addLoan(loan: Loan): void {
    let loans = this.getLoans();
    
    loan.id = new Date().getTime();
    loan.status = 'Active';

    loans.push(loan);
    localStorage.setItem(this.loansKey, JSON.stringify(loans));

    this.generateLoanSchedule(loan);
    console.log("✅ Loan Added:", loan);
  }

  private generateLoanSchedule(loan: Loan): void {
    let schedules: LoanSchedule[] = this.getLoanSchedules();
    const monthlyPayment = this.calculateMonthlyPayment(loan.loanAmount, loan.interestRate, loan.duration);

    let newSchedules: LoanSchedule[] = [];
    for (let i = 1; i <= loan.duration; i++) {
      const dueDate = new Date(loan.startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      newSchedules.push({
        loanId: loan.id,
        installmentNumber: i,
        dueDate: dueDate.toISOString().split('T')[0],
        amount: monthlyPayment,
        status: 'Pending',
        remainingAmount: monthlyPayment,
      });
    }

    schedules = [...schedules, ...newSchedules];
    localStorage.setItem(this.schedulesKey, JSON.stringify(schedules));

    console.log("✅ Loan Schedules Updated:", schedules);
  }

  getLoanSchedules(): LoanSchedule[] {
    return JSON.parse(localStorage.getItem(this.schedulesKey) || '[]');
  }

  getScheduleByLoanId(loanId: number): LoanSchedule[] {
    let schedules = this.getLoanSchedules();
    return schedules.filter(schedule => Number(schedule.loanId) === Number(loanId));
  }

  markInstallmentAsPaid(loanId: number, paidAmount: number): void {
    let schedules = this.getLoanSchedules();
    let remainingPayment = paidAmount; // Track excess payment
  
    let updatedSchedules = schedules.map(schedule => {
      if (Number(schedule.loanId) === Number(loanId) && schedule.status !== 'Paid') {
        console.log(`✅ Processing Installment #${schedule.installmentNumber}! Current Remaining: ${schedule.remainingAmount}, Paid: ${remainingPayment}`);
  
        if (remainingPayment <= 0) return schedule; // No more payment to distribute
  
        // Deduct payment from remainingAmount
        let paymentApplied = Math.min(remainingPayment, schedule.remainingAmount);
        schedule.remainingAmount -= paymentApplied;
        remainingPayment -= paymentApplied;
  
        // Ensure remainingAmount never goes negative
        if (schedule.remainingAmount <= 0) {
          schedule.remainingAmount = 0;
          schedule.status = 'Paid'; // ✅ Update status to "Paid"
          console.log(`✅ Installment #${schedule.installmentNumber} is now PAID!`);
        } else {
          console.log(`🔹 Installment #${schedule.installmentNumber} still has balance: ${schedule.remainingAmount}`);
        }
      }
      return schedule;
    });
  
    // ✅ Persist updated schedules
    localStorage.setItem(this.schedulesKey, JSON.stringify(updatedSchedules));
  
    console.log("✅ Loan Schedules Updated in LocalStorage:", updatedSchedules);
  
    // ✅ Check if entire loan is now fully paid
    if (this.isLoanFullyPaid(loanId)) {
      this.markLoanAsPaid(loanId);
    }
  
    this.installmentUpdated.emit(); // ✅ Notify UI
    this.router.navigate(['/modules/loans/details', loanId]);
  }
  

  
  

  

  private isLoanFullyPaid(loanId: number): boolean {
    let schedules = this.getScheduleByLoanId(loanId);
    return schedules.every(inst => inst.status === 'Paid');
  }

  private calculateMonthlyPayment(principal: number, rate: number, months: number): number {
    const monthlyInterestRate = rate / 100 / 12;
    const totalInterest = principal * monthlyInterestRate * months;
    return (principal + totalInterest) / months;
  }

  deleteLoan(loanId: number): void {
    let loans = this.getLoans().filter(loan => loan.id !== loanId);
    localStorage.setItem(this.loansKey, JSON.stringify(loans));

    let schedules = this.getLoanSchedules().filter(schedule => schedule.loanId !== loanId);
    localStorage.setItem(this.schedulesKey, JSON.stringify(schedules));

    console.log(`🚨 Loan ${loanId} and its schedules deleted!`);
  }
  private markLoanAsPaid(loanId: number): void {
    let loans = this.getLoans();
    let updatedLoans = loans.map(loan => {
      if (loan.id === loanId) {
        return { ...loan, status: 'Paid' };
      }
      return loan;
    });
  
    localStorage.setItem(this.loansKey, JSON.stringify(updatedLoans));
    console.log("🏦 Loan marked as Paid:", updatedLoans);
  }
  
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService, Loan, LoanSchedule } from '../loan.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit, OnDestroy {
  loan: Loan | null = null;
  loanSchedule: LoanSchedule[] = [];
  private subscription!: Subscription;

  constructor(private route: ActivatedRoute, private loanService: LoanService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadLoanDetails();
  
    // ✅ Subscribe to refresh UI after payment
    this.subscription = this.loanService.installmentUpdated.subscribe(() => {
      console.log("🔄 Refreshing Loan Details after Payment...");
      this.loadLoanDetails();
    });
  }
  

  loadLoanDetails(): void {
    const loanId = Number(this.route.snapshot.paramMap.get('id'));
    if (loanId) {
      this.loan = this.loanService.getLoanById(loanId);
      this.loanSchedule = this.loanService.getScheduleByLoanId(loanId);
      this.cdr.detectChanges(); // ✅ Force UI update
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

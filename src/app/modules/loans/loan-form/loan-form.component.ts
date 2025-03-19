import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService, Loan } from '../loan.service';
import { CustomerService } from '../../customers/customer.service';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  customers: Customer[] = [];
  loan: Loan = {
    id: 0,
    customerId: 0,
    loanType: '',
    loanAmount: 0,
    interestRate: 0,
    duration: 0,
    startDate: new Date().toISOString().split('T')[0],
    status: 'Active' 
  };

  isEditMode = false;

  constructor(
    private loanService: LoanService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers(); // Fetch customers for dropdown

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      const existingLoan = this.loanService.getLoanById(id);
      if (existingLoan) this.loan = existingLoan;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      alert('Loan editing not implemented yet.');
    } else {
      this.loanService.addLoan(this.loan);
    }
    this.router.navigate(['/modules/loans']);
  }
}

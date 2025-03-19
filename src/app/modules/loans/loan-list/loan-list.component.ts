import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from '../loan.service';
import { CustomerService } from '../../customers/customer.service';
import { Loan } from '../loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];
  customers: any[] = [];

  constructor(
    private loanService: LoanService, 
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    setTimeout(() => {
      this.loadLoans();
    }, 500); // Ensures customers are loaded first
  }

  loadLoans(): void {
    this.loans = this.loanService.getLoans();
    console.log("✅ Loaded Loans:", this.loans); // Debugging log
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers(); 
    console.log("✅ Loaded Customers:", this.customers); // Debugging log
  }

  getCustomerName(customerId: number): string {
    console.log("🔎 Searching for Customer ID:", customerId, "in", this.customers);

    // Ensure both customerId and id are numbers
    const customer = this.customers.find(c => Number(c.id) === Number(customerId));

    if (customer) {
      console.log(`✅ Found: ${customer.fullName}`);
      return customer.fullName;
    } else {
      console.log("❌ Customer not found!");
      return 'Unknown';
    }
  }

  viewLoan(loanId: number): void {
    this.router.navigate(['/modules/loans/details', loanId]);
  }

  deleteLoan(loanId: number): void {
    this.loanService.deleteLoan(loanId);
    this.loadLoans();
  }
}

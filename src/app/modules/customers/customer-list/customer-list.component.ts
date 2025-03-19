import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }

  viewCustomer(customerId: number): void {
    this.router.navigate(['/modules/customers/details', customerId]);
  }

  editCustomer(customerId: number): void {
    this.router.navigate(['/modules/customers/edit', customerId]);
  }
  

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId);
    this.loadCustomers();
  }
}

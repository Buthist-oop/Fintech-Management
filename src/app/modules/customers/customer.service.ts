import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];

  constructor() {
    this.loadCustomers();
  }

// Get all customers (always fetch fresh data)
getCustomers(): Customer[] {
  const storedData = localStorage.getItem('customers');
  return storedData ? JSON.parse(storedData) : [];
}

  // Get customer by ID
  getCustomerById(id: number): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  // Add new customer
  addCustomer(customer: Customer): void {
    customer.id = this.customers.length + 1; // Generate an ID
    this.customers.push(customer);
    this.saveCustomers();
  }

  // Update customer
  updateCustomer(updatedCustomer: Customer): void {
    const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
      this.customers[index] = updatedCustomer;
      this.saveCustomers();
    }
  }

  // Delete customer
  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(c => c.id !== id);
    this.saveCustomers();
  }

  // Save to localStorage
  private saveCustomers(): void {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  // Load from localStorage
  private loadCustomers(): void {
    const storedData = localStorage.getItem('customers');
    if (storedData) {
      this.customers = JSON.parse(storedData);
    }
  }
}

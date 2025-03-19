import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    id: 0,
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfRegistration: new Date().toISOString().split('T')[0],
    customerType: 'Individual',
    profilePicture: ''
  };

  isEditMode = false;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.customer = this.customerService.getCustomerById(id) || this.customer;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.customer.profilePicture = reader.result as string;
        console.log('Base64 Image:', this.customer.profilePicture);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customer);
    } else {
      this.customerService.addCustomer(this.customer);
    }
    this.router.navigate(['/modules/customers/list']);
;
  }
}

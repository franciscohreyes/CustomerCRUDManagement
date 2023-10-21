import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../Interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customers: Customer[] = [];
  customerForm:any = FormGroup;
  isEdit: boolean = false;

  cliente: Customer = {
    id: 0,
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    phone: '',
    zip_code: ''
  };
  selectedCustomer:any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * initForm
   */
  initForm() {
    this.customerForm = this.fb.group({
      first_name: ['1', Validators.required],
      last_name : ['1', Validators.required],
      address   : ['1', Validators.required],
      email     : ['1', Validators.required],
      phone     : ['1', Validators.required],
      zip_code  : ['1', Validators.required],
    });
  }

  /**
   * saveCustomer
   */
  saveCustomer() {
    if (this.customerForm.valid) {
      // Continuar con la lógica de agregar el cliente
      const newCustomer: Customer = {
        id: 0,
        ...this.customerForm.value,
      };
      this.customerService.addCustomer(newCustomer);
      this.isEdit = false;
      this.customerForm.reset(); // Limpiar el formulario después de agregar
    }
  }

  /**
   * updateCustomer
   */
  updateCustomer() {
    console.log(this.selectedCustomer);
    // this.fillForm(this.selectedCustomer);
    const _update = {
      id        : this.selectedCustomer.id,
      first_name: this.cliente.first_name,
      last_name : this.cliente.last_name,
      address   : this.cliente.address,
      email     : this.cliente.email,
      phone     : this.cliente.phone,
      zip_code  : this.cliente.zip_code
    };

    this.customerService.editCustomer(_update);
    this.isEdit = false;
    this.customerForm.reset();
  }

  /**
   * cancel
   */
  cancel() {
    this.customerForm.reset();
  }

  /**
   * onSelectedCustomer
   * @param $event 
   */
  onSelectedCustomer($event:any) {
    if($event.id != 0) {
      this.isEdit = true;
      this.selectedCustomer = $event;
      this.fillForm(this.selectedCustomer);
    }
  }

  /**
   * fillForm
   * @param customer 
   */
  fillForm(customer:any) {
    this.customerForm.patchValue({
      first_name: customer.first_name,
      last_name: customer.last_name,
      address: customer.address,
      email: customer.email,
      phone: customer.phone,
      zip_code: customer.zip_code
    });
  }

}

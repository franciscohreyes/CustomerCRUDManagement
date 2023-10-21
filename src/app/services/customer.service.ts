import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../Interfaces/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private nextId = 1;
  private itemAdded = new Subject<void>();
  private readonly STORAGE_KEY = "customers";

  constructor() { }

  /**
   * getCustomers
   * @returns customersData
   */
  private getDataCustomers(): Customer[] {
    const customersData = localStorage.getItem(this.STORAGE_KEY)
    return customersData ? JSON.parse(customersData) :  [];
  }

  /**
   * getCustomers
   * @returns 
   */
  getCustomers(): Customer[] {
    return this.getDataCustomers();
  }

  /**
   * saveCustomer
   * @param customer 
   */
  private saveCustomer(customer: Customer[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(customer));
  }

  /**
   * addCustomer
   * @param customer 
   */
  addCustomer(customer:Customer): void {
    const _customers = this.getDataCustomers();
    const nuevoId = this.nextId++;
    customer.id = nuevoId;
    _customers.push(customer);
    this.saveCustomer(_customers);
    this.itemAdded.next();
  }

  /**
   * editCustomerById
   * @param customer 
   * @returns 
   */
  editCustomerById(customer: Customer) {
    const _customers = this.getDataCustomers();
    const index = _customers.findIndex((c) => c.id === customer.id);

    if (index !== -1) {
      this.customers[index] = customer;
      this.saveCustomer(_customers);
    }

    return this.customers[index];
  }

  /**
   * editCustomer
   * @param customer 
   */
  editCustomer(customer: Customer) {
    const _customers = this.getDataCustomers();
    const index = _customers.findIndex((c) => c.id === customer.id);

    if (index !== -1) {
      _customers[index] = customer;
      this.saveCustomer(_customers);
      this.itemAdded.next();
    }
  }

  /**
   * deleteCustomer
   * @param id 
   */
  deleteCustomer(id: number) {
    const _customers = this.getDataCustomers();
    const index = _customers.findIndex((c) => c.id === id);

    if (index !== -1) {
      _customers.splice(index, 1);
      this.saveCustomer(_customers);
    }
  }

  /**
   * removeAllCustomers
   */
  removeAllCustomers() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * getItemAddedEvent
   * @returns 
   */
  getItemAddedEvent() {
    return this.itemAdded.asObservable();
  }
}

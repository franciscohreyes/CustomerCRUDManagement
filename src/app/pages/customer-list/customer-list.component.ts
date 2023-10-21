import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* Interfaces */
import { Customer } from '../../Interfaces/Customer';
/* Services */
import { CustomerService } from '../../services/customer.service';
/* */
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  mensajeModal: string = '';
  customerToDelete: Customer | null = null;
  @Output() onSelected = new EventEmitter<Customer>();
  @Input() onRefresh = new EventEmitter<any>();

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.getAllCustomers();

    this.customerService.getItemAddedEvent().subscribe(() => {
      this.customers = this.customerService.getCustomers();
    });
  }

  /**
   * getAllCustomers
   */
  getAllCustomers() {
    this.customers = this.customerService.getCustomers();
  }

  deleteAllCustomers() {
    this.customerService.removeAllCustomers();
    this.getAllCustomers();
  }

  /**
   * removeCustomer
   * @param customer 
   */
  removeCustomer(customer: Customer) {
    const confirmar = confirm(`¿Estás seguro de eliminar a ${customer.first_name} ${customer.last_name}?`);
    if (confirmar) {
      this.customerService.deleteCustomer(customer.id);
      // Actualizar la lista de clientes después de la eliminación
      this.getAllCustomers();
    }
  }

  /**
   * openModalConfirm
   * @param customer 
   * @param modalContent 
   */
  openModalConfirm(customer: Customer, modalContent: any) {
    this.customerToDelete = customer;
    
    const modalRef = this.modalService.open(ModalConfirmationComponent, { centered: true });
    modalRef.componentInstance.message = `${customer.first_name} ${customer.last_name}`;

    modalRef.result.then((result) => {
      if (result === true) {
        this.customerService.deleteCustomer(customer.id);
        this.getAllCustomers();
      }
    }).catch(() => {
    });
  }

  /**
   * onSelectedCustomer
   * @param number id
   */
  onSelectedCustomer(item:Customer) {
    let _customer = this.customerService.editCustomerById(item);

    this.onSelected.emit(_customer);
  }

}

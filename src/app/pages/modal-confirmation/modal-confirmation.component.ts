import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent {
  @Input() message: string = "";

  constructor(public activeModal: NgbActiveModal) {}

  /**
   * confirm
   */
  confirm() {
    this.activeModal.close(true); 
  }

  /**
   * closeModal
   * Close the modal without confirming the action
   */
  closeModal() {
    this.activeModal.dismiss(); // Cerrar el modal sin confirmar la acción
  }

}

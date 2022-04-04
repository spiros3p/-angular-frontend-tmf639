import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faUserAltSlash, faUser } from '@fortawesome/free-solid-svg-icons';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalDeleteResourceComponent } from '../modal-delete-resource/modal-delete-resource.component';
import { User } from 'src/app/models/User';

/**
 * The List component that appears on the /Admin Route showing all the registered users
 */
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  @Input() user!: User;
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter();
  @Output() onToggleUser: EventEmitter<User> = new EventEmitter();

  faTrashAlt = faTrashAlt;
  faUserAltSlash = faUserAltSlash;
  faUser = faUser;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void { }

  /**
   * Triggered when the delete button gets clicked
   * Calls a modal to verify the Delete action
   * Passes the result to the parent component
   */
  openDeleteModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.user = this.user;
    modalRef.result.then((result: User) => {
      this.onDeleteUser.emit(result);
    });
  }

   /**
   * Triggered when the user allow/disa button gets clicked
   * Calls a modal to verify the Delete action
   * Passes the result to the parent component
   */
  openToggleModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.toggleType = true;
    modalRef.result.then((result: User) => {
      this.onToggleUser.emit(result);
    });
  }

}

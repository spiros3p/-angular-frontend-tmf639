import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faPencilAlt, faUserAltSlash, faUser } from '@fortawesome/free-solid-svg-icons';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/services/alertify.service';

import { ModalDeleteResourceComponent } from '../modal-delete-resource/modal-delete-resource.component';
import { User } from 'src/app/models/User';

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

  openDeleteModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.resource = this.user;
    modalRef.result.then((result: User) => {
      this.onDeleteUser.emit(result);
    });
  }

  openToggleModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.resource = this.user;
    modalRef.componentInstance.toggleType = true;
    modalRef.result.then((result: User) => {
      this.onToggleUser.emit(result);
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Resource } from 'src/app/models/resource';
import { User } from 'src/app/models/User';

/**
 * This modal is displayed as a confirmation
 * 1)of the delete action for a resource, either from the home page or single resource page
 * 2)of the delete or toggle action of a user from the account page - admin role only component
 */
@Component({
  selector: 'app-modal-delete-resource',
  templateUrl: './modal-delete-resource.component.html',
  styleUrls: ['./modal-delete-resource.component.scss']
})
export class ModalDeleteResourceComponent implements OnInit {

  /** variable of type resource passed by the component that the modals is called */
  @Input() public resource!: Resource;
  /** variable of type user passed by the component that the modals is called */
  @Input() public user!: User;
  /** 
   * variable of type boolean passed by the component that the modals is called 
   * either 'delete'=false or 'toggle'=true
  */
  @Input() public toggleType!: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  /**
   * Confirmation function
   * @returns the resource or user to be deleted or updated
   */
  passBack() {
    if (this.user){
      this.activeModal.close(this.user);
    }else if(this.resource){
      this.activeModal.close(this.resource);
    }
  }

  ngOnInit(): void {
  }
}

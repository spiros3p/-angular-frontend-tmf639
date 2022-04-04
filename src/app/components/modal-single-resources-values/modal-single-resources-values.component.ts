import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Resource } from 'src/app/models/resource';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';

/**
 * This is a modal displayed when modifying the values (Description, Category, Resource version) from the single resource page
 */
@Component({
  selector: 'app-modal-single-resources-values',
  templateUrl: './modal-single-resources-values.component.html',
  styleUrls: ['./modal-single-resources-values.component.scss']
})
export class ModalSingleResourcesValuesComponent implements OnInit {

  @Input() public resource!: Resource;
  faUpload = faUpload;
  empty: boolean = false;
  resourceUpdate!: Omit<ResourceUpdate, "name" | "resource_characteristic">;

  constructor(public activeModal: NgbActiveModal) { }

  /**
   * It is initiated with the values from the resource
   */
  ngOnInit(): void {
    this.resourceUpdate = {
      category: this.resource.category,
      description: this.resource.description,
      resource_version: this.resource.resource_version,
    }
  }

  /** 
   * Confirmation function 
   * requires Category and Resource Version to not be empty
   * @returns an object with the new values of the resource
   */
  passBack() {
    if (this.resourceUpdate.category == "") {
      this.empty = true;
      return;
    }
    if (this.resourceUpdate.resource_version == "") {
      this.empty = true;
      return;
    }
    this.activeModal.close(this.resourceUpdate);
  }

}

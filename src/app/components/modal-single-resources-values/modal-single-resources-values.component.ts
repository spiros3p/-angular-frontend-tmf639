import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { faUpload } from '@fortawesome/free-solid-svg-icons';


import { Resource } from 'src/app/models/resource';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';

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

  ngOnInit(): void {
    this.resourceUpdate = {
      category: this.resource.category,
      description: this.resource.description,
      resource_version: this.resource.resource_version,
    }
  }

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

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Resource } from 'src/app/models/resource';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';

/**
 * This is a modal displayed when modifying the parameters from the single resource page
 */
@Component({
  selector: 'app-modal-single-resources-parameters',
  templateUrl: './modal-single-resources-parameters.component.html',
  styleUrls: ['./modal-single-resources-parameters.component.scss']
})
export class ModalSingleResourcesParametersComponent implements OnInit {

  @Input() public resource!: Resource;
  @Input() public indexActionParameters!: number;

  empty: boolean = false;
  resourceUpdate!: Pick<ResourceUpdate, "resource_characteristic">;
  tempUpdate!: Pick<ResourceUpdate, "resource_characteristic">;

  constructor(public activeModal: NgbActiveModal) { }

  /** Initializes the resource_update object and its temp instance to fill the input values with the existing ones */
  ngOnInit(): void {
    this.resourceUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
    this.tempUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
  }

  /**
   * A temp object is used to save the property. 
   * That because the parameters property is a nested object inside the resource_chracteristic property.
   * Therefore in every input change (keystroke) it would update the whole outside property malfunctioning the display of the component.
   * @param $event the input change event
   * @param item the parameter key-value pair of the object that is changing value from the input
   */
  onChange($event: any, item: any) {
    this.tempUpdate.resource_characteristic![this.indexActionParameters].value.value[item.key] = $event;
  }

  /** 
   * Confirmation function 
   * @returns an object with the new values of the resource
   */
  passBack() {
    // maybe not necessary - can return the tempUpdate object directly 
    this.resourceUpdate.resource_characteristic![this.indexActionParameters] = this.tempUpdate.resource_characteristic![this.indexActionParameters];
    this.activeModal.close(this.resourceUpdate);
  }

}

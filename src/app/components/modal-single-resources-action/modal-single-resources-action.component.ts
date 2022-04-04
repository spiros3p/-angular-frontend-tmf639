import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Resource } from 'src/app/models/resource';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';

/**
 * This is a modal displayed when pressing one of the Action Buttons from the single resource page.
 * Displays a confirmation message for the action
 * and
 * the parameters if they were previously changed and not already sent before this action.
 */
@Component({
  selector: 'app-modal-single-resources-action',
  templateUrl: './modal-single-resources-action.component.html',
  styleUrls: ['./modal-single-resources-action.component.scss']
})
export class ModalSingleResourcesActionComponent implements OnInit {

  @Input() public resource!: Resource;
  @Input() public action!: string;
  @Input() public parametersChanged!: boolean;

  empty: boolean = false;
  resourceUpdate!: Pick<ResourceUpdate, "resource_characteristic">;
  tempUpdate!: Pick<ResourceUpdate, "resource_characteristic">;
  indexActionParameters: number = -1;
  indexAction: number = -1;

  /**
   * Confirmation Function
   * @returns an object with the new values of the resource
   */
  passBack() {
    this.resourceUpdate.resource_characteristic![this.indexActionParameters] = this.tempUpdate.resource_characteristic![this.indexActionParameters];
    this.resourceUpdate.resource_characteristic![this.indexAction].value.value = this.action;
    this.activeModal.close(this.resourceUpdate);
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

  constructor(public activeModal: NgbActiveModal) { }

  /**
    * Initializes the resource_update object and its temp instance to fill the input values with the existing ones.
    * Retrieves the required property indexes from the original object 
    * If there is no 'action' property, one is action object is created and pushed in the new updated object that is returned
   */
  ngOnInit(): void {
    this.resourceUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
    this.tempUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
    this.indexActionParameters = this.resource.resource_characteristic!.findIndex(e => e.name === 'action_parameters')
    this.indexAction = this.resource.resource_characteristic!.findIndex(e => e.name === 'action');
    if (this.indexAction == -1) {
      this.resourceUpdate.resource_characteristic!.push(
        {
          "id": this.resource.resource_characteristic![0].id || "-1",
          "name": "action",
          "value_type": "string",
          "value": {
            "value": this.action
          }
        }
      )
      this.indexAction = this.resourceUpdate.resource_characteristic!.length - 1;
    };
  }

}
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Resource } from 'model/resource';
import { ResourceUpdate } from 'model/resourceUpdate';

@Component({
  selector: 'app-modal-single-resources',
  templateUrl: './modal-single-resources.component.html',
  styleUrls: ['./modal-single-resources.component.scss']
})
export class ModalSingleResourcesComponent implements OnInit {

  @Input() public resource!: Resource;
  @Input() public action!: string;
  @Input() public parametersChanged!: boolean;

  empty: boolean = false;
  resourceUpdate!: Pick<ResourceUpdate, "resource_characteristic">;
  tempUpdate!: Pick<ResourceUpdate, "resource_characteristic">;
  indexActionParameters: number = -1;
  indexAction: number = -1;

  passBack() {
    this.resourceUpdate.resource_characteristic[this.indexActionParameters] = this.tempUpdate.resource_characteristic[this.indexActionParameters];
    this.activeModal.close(this.resourceUpdate);
  }

  onChange($event: any, item: any) {
    this.tempUpdate.resource_characteristic[this.indexActionParameters].value.value[item.key] = $event;
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.resourceUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
    this.tempUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
    this.indexActionParameters = this.resource.resource_characteristic.findIndex(e => e.name === 'action_parameters')
    this.indexAction = this.resource.resource_characteristic.findIndex(e => e.name === 'action');
    if (this.indexAction == -1) {
      this.resourceUpdate.resource_characteristic.push(
        {
          "id": this.resource.resource_characteristic[0].id,
          "name": "action",
          "value_type": "string",
          "value": {
            "value": this.action
          }
        }
      )
      this.indexAction = this.resourceUpdate.resource_characteristic.length - 1;
    };
  }

}
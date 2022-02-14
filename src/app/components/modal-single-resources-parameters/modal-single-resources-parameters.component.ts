import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Resource } from 'model/resource';
import { ResourceUpdate } from 'model/resourceUpdate';

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

  ngOnInit(): void {
    this.resourceUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
    this.tempUpdate = {
      resource_characteristic: JSON.parse(JSON.stringify(this.resource.resource_characteristic))
    }
  }

  onChange($event: any, item: any) {
    this.tempUpdate.resource_characteristic[this.indexActionParameters].value.value[item.key] = $event;
  }

  passBack() {
    this.resourceUpdate.resource_characteristic[this.indexActionParameters] = this.tempUpdate.resource_characteristic[this.indexActionParameters];
    this.activeModal.close(this.resourceUpdate);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Resource } from 'model/resource';

@Component({
  selector: 'app-modal-delete-resource',
  templateUrl: './modal-delete-resource.component.html',
  styleUrls: ['./modal-delete-resource.component.scss']
})
export class ModalDeleteResourceComponent implements OnInit {

  @Input() public resource!: Resource;
  @Input() public toggleType!: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  passBack() {
    this.activeModal.close(this.resource);
  }

  ngOnInit(): void {
  }
}

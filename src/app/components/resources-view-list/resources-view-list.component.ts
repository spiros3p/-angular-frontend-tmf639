import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, 	faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';

import { Resource } from 'model/resource';

@Component({
  selector: 'app-resources-view-list',
  templateUrl: './resources-view-list.component.html',
  styleUrls: ['./resources-view-list.component.scss']
})
export class ResourcesViewListComponent implements OnInit {

  @Input() isAdmin!: boolean;
  @Input() resources!: Resource[];
  @Input() mapPageCurrent!: boolean;
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  
  constructor() { }

  ngOnInit(): void {
  }

  toDeleteTask(resource: Resource){
    this.onDeleteResource.emit(resource);
  }
}

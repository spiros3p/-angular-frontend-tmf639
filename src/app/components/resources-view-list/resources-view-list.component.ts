import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faTrashAlt, 	faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';

import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resources-view-list',
  templateUrl: './resources-view-list.component.html',
  styleUrls: ['./resources-view-list.component.scss']
})
export class ResourcesViewListComponent implements OnInit, OnChanges {

  @Input() isAdmin!: boolean;
  @Input() resources!: Resource[];
  @Input() mapPageCurrent!: boolean;
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  
  page:number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.page = 1;
  }

  toDeleteTask(resource: Resource){
    this.onDeleteResource.emit(resource);
  }
}

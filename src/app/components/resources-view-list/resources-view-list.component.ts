import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faTrashAlt, 	faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';

import { Resource } from 'src/app/models/resource';

/**
 * Component that is displaying the Resources as a list
 */
@Component({
  selector: 'app-resources-view-list',
  templateUrl: './resources-view-list.component.html',
  styleUrls: ['./resources-view-list.component.scss']
})
export class ResourcesViewListComponent implements OnInit, OnChanges {

  @Input() isAdmin!: boolean;
  @Input() resources!: Resource[];
  @Input() mapPageCurrent!: boolean;
  /** Emits the Delete Event to the parent (resource.component) */
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  
  /** Stores the current page of the paginator */
  page:number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  /** Pagination use to change pages */
  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (this.page > Math.ceil(changes.resources.currentValue.length / 6)) {
        this.page = 1;
      }
    }catch(e){
      console.error(e);
    }
  }

  /**
   * Emits the Delete Event to the parent (resource.component)
   * @param {Resource} resource the to be Deleted Resource
   */
  toDeleteTask(resource: Resource){
    this.onDeleteResource.emit(resource);
  }
}

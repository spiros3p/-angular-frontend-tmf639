import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Resource } from 'src/app/models/resource';

/**
 * Component that is displaying the Resources as Blocks-grid
 */
@Component({
  selector: 'app-resources-view-block',
  templateUrl: './resources-view-block.component.html',
  styleUrls: ['./resources-view-block.component.scss']
})
export class ResourcesViewBlockComponent implements OnInit, OnChanges {

  @Input() isAdmin!: boolean;
  @Input() resources!: Resource[];
  /** Emits the Delete Event to the parent (resource.component) */
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

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

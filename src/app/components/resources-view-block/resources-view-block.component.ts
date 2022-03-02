import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resources-view-block',
  templateUrl: './resources-view-block.component.html',
  styleUrls: ['./resources-view-block.component.scss']
})
export class ResourcesViewBlockComponent implements OnInit, OnChanges {

  @Input() isAdmin!: boolean;
  @Input() resources!: Resource[];
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

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

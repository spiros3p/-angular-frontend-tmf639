import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resources-view-block',
  templateUrl: './resources-view-block.component.html',
  styleUrls: ['./resources-view-block.component.scss']
})
export class ResourcesViewBlockComponent implements OnInit {

  @Input() isAdmin!: boolean;
  @Input() resources!: Resource[];
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toDeleteTask(resource: Resource){
    this.onDeleteResource.emit(resource);
  }
}

import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faPencilAlt, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalDeleteResourceComponent } from '../modal-delete-resource/modal-delete-resource.component';

import { Resource } from 'src/app/models/resource';
import * as L from 'leaflet';

/** Marker icon for leaflet map use  */
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

/** Component of resource item displaying as a list item */
@Component({
  selector: 'app-resource-item-list',
  templateUrl: './resource-item-list.component.html',
  styleUrls: ['./resource-item-list.component.scss']
})
export class ResourceItemListComponent implements AfterViewInit, OnInit {

  @Input() isAdmin!: boolean;
  @Input() resource!: Resource;
  @Input() mapPageCurrent!: boolean;
  /** Used to give different IDs to all list items for leaflet map use */
  @Input() counter!: number;
  /** Emit delete event to parent component that runs the logic */
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  faEye = faEye;
  faTimes = faTimes;
  /** Needed for leaflet use in angular */
  public map: any;
  showMap!: boolean;
  /** the index of the item inside the resource_characteristic array property of the resource object */
  indexIP!: number;
  indexLocation!: number;

  constructor(
    private modalService: NgbModal,
  ) { }

  /** On click displays/hides the map of the resource */
  toggleMap() {
    this.showMap = !this.showMap;
  }

  /** 
   * Method to display the ModalDeleteResourceComponent 
   * On modal confirmation signal sends the onDeleteResource output to the parent component
  */
  openDeleteModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.resource = this.resource;
    modalRef.result.then((result: Resource) => {
      this.onDeleteResource.emit(result);
    });
  }

  /** Defines the leaflet map */
  private initMap(): void {
    let coordinateX: number = this.resource.resource_characteristic![this.indexLocation].value.value[0];
    let coordinateY: number = this.resource.resource_characteristic![this.indexLocation].value.value[1];

    this.map = L.map("map-" + this.counter, {
      center: [coordinateX, coordinateY],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 0,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    const marker = L.marker([coordinateX, coordinateY]).addTo(this.map);
  }

  /** On Init, gets the indexes for the required objects that exist or not in the resource_characteristic array property of the resource object */
  ngOnInit(): void {
    if (this.resource.resource_characteristic) {
      this.indexLocation = this.resource.resource_characteristic.findIndex(e => e.name === 'location');
      this.indexIP = this.resource.resource_characteristic.findIndex(e => e.name === 'IP');
    } else {
      this.indexLocation = -1;
      this.indexIP = -1;
    }
  }

  /** Calls the map method */
  ngAfterViewInit(): void {
    if (this.indexLocation != -1) {
      this.initMap();
    }
  }

}

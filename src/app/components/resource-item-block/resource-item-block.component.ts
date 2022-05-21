import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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

/** Component of resource item displaying as a block item */
@Component({
  selector: 'app-resource-item-block',
  templateUrl: './resource-item-block.component.html',
  styleUrls: ['./resource-item-block.component.scss']
})
export class ResourceItemBlockComponent implements OnInit, AfterViewInit {

  @Input() isAdmin!: boolean;
  @Input() resource!: Resource;
  /** Used to give different IDs to all list items for leaflet map use */
  @Input() counter!: number;
  /** Emit delete event to parent component that runs the logic */
  @Output() onDeleteResource: EventEmitter<Resource> = new EventEmitter();

  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;
  /** Needed for leaflet use in angular */
  public map: any;
  indexIP!: number;
  indexLocation!: number;

  constructor(
    private modalService: NgbModal,
  ) { }

  openDeleteModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.resource = this.resource;
    modalRef.result.then((result: Resource) => {
      this.onDeleteResource.emit(result);
    });
  }

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

  ngOnInit(): void {
    if (this.resource.resource_characteristic) {
      this.indexLocation = this.resource.resource_characteristic.findIndex(e => e.name === 'location');
      this.indexIP = this.resource.resource_characteristic.findIndex(e => e.name === 'IP');
    } else {
      this.indexLocation = -1;
      this.indexIP = -1;
    }
  }

  ngAfterViewInit(): void {
    if (this.indexLocation != -1) {
      this.initMap();
    }
  }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResourceCreate } from 'src/app/models/resourceCreate';

import { ResourceService } from 'src/app/services/resource.service';
import { AlertifyService } from 'src/app/services/alertify.service';

import * as L from 'leaflet';

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

/**
 * Displayes the Create Resource tab Page 
 * Contains all its logic
 */
@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.scss']
})
export class CreateResourceComponent implements OnInit, AfterViewInit {

  /** Interface is produced from the tmf-639 OpenAPI spec */
  resourceCreate!: ResourceCreate;
  /** Define variable type of each input in the form */
  category!: string;
  description!: string;
  name!: string;
  resource_version!: string;
  IP!: string;
  /** Default coordinates to UP area */
  latitude: number = 38.2891609656397;
  longitude: number = 21.789008070018838;

  /** Default supported action - random choice */
  supportedActions: string[] = ['touch'];
  start: string = 'start';
  restart: string = 'restart';
  stop: string = 'stop';
  status: string = 'status';
  touch: string = 'touch';
  private map: any;
  marker!: L.Marker<any>;


  constructor(
    private resourceService: ResourceService,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }

  /** 
   * Method called when user clicks on an action button
   * Either removes or adds the action to the list property supported_actions
   */
  toggleAction(action: string) {
    if (this.supportedActions.includes(action)) {
      this.removeItem(this.supportedActions, action);
    } else {
      this.supportedActions.push(action);
    }
  }

  /** 
   * Method called on clear button click
   * Clears the form inputs
   */
  clear() {
    this.category = '';
    this.description = '';
    this.name = '';
    this.resource_version = '';
    this.IP = '';
    this.latitude = 38.2891609656397;
    this.longitude = 21.789008070018838;
    this.marker.setLatLng([this.latitude, this.longitude]);
    this.map.panTo([this.latitude, this.longitude]);
  }

  /**
   * Method called on submit of the form
   * Sets the resourceCreate object with its coresponding input values
   * Calls the resourceService to send the post request for the resource
   */
  onSubmit() {
    this.resourceCreate.category = this.category;
    this.resourceCreate.description = this.description;
    this.resourceCreate.name = this.name;
    this.resourceCreate.resource_version = this.resource_version;
    this.resourceCreate.resource_characteristic[0].value.value = this.IP;
    this.resourceCreate.resource_characteristic[1].value.value[0] = this.latitude;
    this.resourceCreate.resource_characteristic[1].value.value[1] = this.longitude;
    this.resourceCreate.resource_characteristic[2].value.value = this.supportedActions;
    console.log("Form submited")

    this.resourceService
      .createResource(this.resourceCreate)
      .subscribe(
        (val) => {
          console.debug("PATCH call successful value returned in body", val);
        },
        response => {
          this.alertifyService.error("ERROR:<br>" + response)
          console.debug("PATCH call in error", response);
        },
        () => {
          this.alertifyService.success("Succesfully created New Reasource!")
          console.debug("New Resource Created!");
          this.router.navigate(['/']);
        }
      )
  }

  /** 
   * Method called On focus out from the coordinate Inputs
   * sets the marker coordinate on the map according to the input
  */
  setMap(event: any, coordinate: string) {
    if (coordinate == 'longitude') {
      this.marker.setLatLng([this.latitude, event.target.value]);
      this.map.panTo([this.latitude, event.target.value]);
    } else {
      this.marker.setLatLng([event.target.value, this.longitude]);
      this.map.panTo([event.target.value, this.longitude]);
    }
  }

  /** easter egg - can't remember why this might be in here */
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  /** Method called from the Toggle method for the actions to remove them from the list if they exist there */
  removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  /** Defines the leaflet map method */
  private initMap(): void {
    let latCenter = this.latitude;
    let longCenter = this.longitude;
    this.map = L.map("map", {
      center: [latCenter, longCenter],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 0,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.marker = L.marker([latCenter, longCenter], { draggable: true });
    this.marker.on('dragend', (_e?: any) => {
      this.latitude = this.marker.getLatLng().lat;
      this.longitude = this.marker.getLatLng().lng;
    });
    this.marker.addTo(this.map);
  }

  /** Calls the leaflet Map method */
  ngAfterViewInit(): void {
    this.initMap();
  }

  /** On init, initialazes the resourceCreate Object - random - change according to needs*/
  ngOnInit(): void {
    this.resourceCreate =
    {
      "category": "",
      "description": "",
      "name": "",
      "resource_version": "",
      "administrative_state": "unlocked",
      "operational_state": "enable",
      "resource_characteristic": [
        {
          "id": "string",
          "name": "IP",
          "value_type": "string",
          "value": {
            "value": ""
          }
        },
        {
          "id": "string",
          "name": "location",
          "value_type": "array",
          "value": {
            "value": [0, 0]
          }
        },
        {
          "id": "string",
          "name": "supported_actions",
          "value_type": "list",
          "value": {
            "value": []
          }
        }
      ],
      "resource_status": "available",
      "usage_state": "active"
    }
  }

}

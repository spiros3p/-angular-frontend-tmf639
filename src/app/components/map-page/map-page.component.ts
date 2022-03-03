import { AfterViewInit, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertifyService } from 'src/app/services/alertify.service';
import { ResourceService } from 'src/app/services/resource.service';
import { ModalSingleResourcesActionComponent } from '../modal-single-resources-action/modal-single-resources-action.component';

import { Resource } from 'src/app/models/resource';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';



import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const blueIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const greyIcon = L.icon({
  iconRetinaUrl: 'assets/images/markers/marker-icon-2x-grey.png',
  iconUrl: 'assets/images/markers/marker-icon-grey.png',
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = greyIcon;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements AfterViewInit {

  constructor(
    private resourceService: ResourceService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
    ) { }
  
  private map: any;
  resources!: Resource[];
  selectedResources!: Resource[];
  indexLocation!: number;
  indexSupportedActions!: number;
  showActions!: boolean;

  activationFeaturePatch: Pick<ResourceUpdate, "activation_feature"> = {
    "activation_feature" : [{
      "name":"gNodeB_service",
      "feature_characteristic":[]
    }]
  };
  
  layerGroup!:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 0, 0 ],
      zoom: 1
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 0,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
  }

  makeMarkers(): void{
    this.resourceService
      .listResource()
      .subscribe((resources) => {
        let arrayOfMarkers=[];
        let indexLocation: number;
        for (const resource of resources){
          try{
            indexLocation = resource.resource_characteristic?.findIndex(e => e.name === 'location') || -1;
            let coordinateX: number = resource.resource_characteristic![indexLocation].value.value[0];
            let coordinateY: number = resource.resource_characteristic![indexLocation].value.value[1];
            const marker = L.marker([coordinateX, coordinateY], {icon: resource.operational_state=='disable' ? greyIcon : blueIcon})
              .on('click', event=>{
                this.selectedResources = [resource];
                this.indexSupportedActions = resource.resource_characteristic?.findIndex(e => e.name === 'supported_actions') || -1;
                if (this.indexSupportedActions!==-1 && resource.operational_state!='disable' && resource.resource_status=='available'){
                  this.showActions = true;
                }else{
                  this.showActions = false;
                }

              })
              .addTo(this.layerGroup);
            marker.bindPopup(`<b>Name: </b>${resource.name}<br><b>Resource Status: </b>${resource.resource_status}<br><b>Operational state: </b>${resource.operational_state}`);
            arrayOfMarkers.push([coordinateX, coordinateY]);
          }catch(err){
            console.error(err);
          }
        }
        if (arrayOfMarkers.length > 1){
          this.map.fitBounds(arrayOfMarkers, {padding: [25,25]});
        }else{
          try{
            indexLocation = resources[0].resource_characteristic?.findIndex(e => e.name === 'location') || -1;
            this.map.setView([resources[0].resource_characteristic![indexLocation].value.value[0], resources[0].resource_characteristic![indexLocation].value.value[1]], 16)
          }catch(err){
            console.error(err);
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.makeMarkers();
  }

  openActionModal(action: string) {
    const modalRef = this.modalService.open(ModalSingleResourcesActionComponent);
    modalRef.componentInstance.parametersChanged = false;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.resource = this.selectedResources[0];
    modalRef.result.then((result: ResourceUpdate) => {
      this.activationFeaturePatch.activation_feature![0].feature_characteristic.push(
        {
          "name": "action",
          "value":{
            "value": action
          }
        }
      );
      
      this.resourceService
        .patchResource(this.selectedResources[0].id, this.activationFeaturePatch)
        .subscribe(
          (val) => {
            this.selectedResources[0] = val;
            this.selectedResources[0].operational_state = 'disable';
            console.debug("PATCH call successful value returned in body", val);
          },
          response => {
            this.alertifyService.error("ERROR:<br>" + response)
            console.debug("PATCH call in error", response);
          },
          () => {
            this.layerGroup.clearLayers(); //remove markers
            this.makeMarkers(); // put refreshed markers
            this.alertifyService.success("SUCCESS:<br>ACTION: " + result.resource_characteristic![result.resource_characteristic!.findIndex(e => e.name === 'action')].value.value + "<br> Changes Saved on the Server")
            console.debug("The PATCH observable is now completed.");
            this.activationFeaturePatch.activation_feature![0].feature_characteristic = [];
          }
        )
    });
  }
}

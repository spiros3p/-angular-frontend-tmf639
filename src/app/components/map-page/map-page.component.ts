import { AfterViewInit, Component } from '@angular/core';

import { ResourceService } from 'src/app/services/resource.service';

import { Resource } from 'src/app/models/resource';

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

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements AfterViewInit {

  constructor(private resourceService: ResourceService,) { }
  
  private map: any;
  resources!: Resource[];
  selectedResources!: Resource[];
  indexLocation!: number;
  
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
            const marker = L.marker([coordinateX, coordinateY]).on('click', event=>{
              this.selectedResources = [resource];
            }).addTo(this.map);
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

}

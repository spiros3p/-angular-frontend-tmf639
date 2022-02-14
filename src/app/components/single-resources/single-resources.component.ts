import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faLongArrowAltLeft, faTrashAlt, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { UiService } from '../../services/ui.service';
import { ResourceService } from 'api/resource.service';
import { AlertifyService } from 'src/app/services/alertify.service';

import { ModalSingleResourcesParametersComponent } from '../modal-single-resources-parameters/modal-single-resources-parameters.component';
import { ModalSingleResourcesValuesComponent } from '../modal-single-resources-values/modal-single-resources-values.component';
import { ModalSingleResourcesComponent } from '../modal-single-resources/modal-single-resources.component';
import { ModalDeleteResourceComponent } from '../modal-delete-resource/modal-delete-resource.component';

import { Resource } from 'model/resource';
import { ResourceUpdate } from 'model/resourceUpdate';
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
  selector: 'app-single-resources',
  templateUrl: './single-resources.component.html',
  styleUrls: ['./single-resources.component.scss']
})
export class SingleResourcesComponent implements OnInit, AfterViewInit, OnDestroy {

  resource!: Resource;
  resourceCharacteristicUpdate!: Pick<ResourceUpdate, "resource_characteristic">;

  private map: any;
  subscriptionToIsAdmin!: Subscription;
  isAdmin!: boolean;

  faUpload = faUpload;
  faEdit = faEdit;
  faLongArrowAltLeft = faLongArrowAltLeft;
  faTrashAlt = faTrashAlt;

  indexActionParameters!: number;
  indexLocation!: number;
  indexIP!: number;
  indexSupportedActions!: number;

  noActionParametersSet!: boolean;
  parametersChanged: boolean = false;


  constructor(
    private resourceService: ResourceService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private uiService: UiService
  ) {
    this.subscriptionToIsAdmin =
      this.uiService
        .onToggleAdmin()
        .subscribe(
          (value) => (this.isAdmin = value)
        )
  }

  ngOnInit(): void {
    this.uiService.toggleAdmin();
    this.resourceService
      .retrieveResource(this._Activatedroute.snapshot.paramMap.get("id"))
      .subscribe(
        (resource) => {
          if (resource.operational_state === 'disable') {
            this.router.navigate(['/']);
            this.alertifyService.error("ERROR:<br> This Resource is not operational")
          }
          this.resource = resource;
          this.indexLocation = this.resource.resource_characteristic.findIndex(e => e.name === 'location');
          this.indexIP = this.resource.resource_characteristic.findIndex(e => e.name === 'IP');
          this.indexSupportedActions = this.resource.resource_characteristic.findIndex(e => e.name === 'supported_actions');
          this.indexActionParameters = this.resource.resource_characteristic.findIndex(e => e.name === 'action_parameters');
          if (this.indexActionParameters == -1) { this.noActionParametersSet = true };
        }
      )
  }

  ngAfterViewInit(): void {
    if (this.indexLocation != -1) {
      this.initMap();
    }
  }

  ngOnDestroy(): void { }

  resetParameters() {
    this.parametersChanged = false;
    this.resourceService
      .retrieveResource(this._Activatedroute.snapshot.paramMap.get("id"))
      .subscribe(
        (resource) => this.resource.resource_characteristic[this.indexActionParameters] = resource.resource_characteristic[this.indexActionParameters])
  }

  openModifyModal() {
    const modalRef = this.modalService.open(ModalSingleResourcesValuesComponent);
    modalRef.componentInstance.resource = this.resource;
    modalRef.result.then((result: ResourceUpdate) => {
      this.resourceService
        .patchResource(this.resource.id, result)
        .subscribe(
          (val) => {
            this.resource = val;
            console.debug("PATCH REQUEST successful value returned in body", val);
          },
          response => {
            this.alertifyService.error("ERROR:<br>" + response)
            console.debug("PATCH call in error", response);
          },
          () => {
            this.alertifyService.success("SUCCESS:<br> Changes Saved on the Server")
            console.debug("The PATCH observable is now completed.");
          }
        )
    });
  }

  openParametersModal() {
    const modalRef = this.modalService.open(ModalSingleResourcesParametersComponent);
    modalRef.componentInstance.resource = this.resource;
    modalRef.componentInstance.indexActionParameters = this.indexActionParameters;
    modalRef.result.then((result: Pick<ResourceUpdate, "resource_characteristic">) => {
      if (JSON.stringify(this.resource.resource_characteristic[this.indexActionParameters].value.value) != JSON.stringify(result.resource_characteristic[this.indexActionParameters].value.value)) {
        this.parametersChanged = true;
      }
      this.resourceCharacteristicUpdate = result;
      this.resource.resource_characteristic = result.resource_characteristic;
    });
  }

  uploadParameters() {
    this.resourceService
      .patchResource(this.resource.id, this.resourceCharacteristicUpdate)
      .subscribe(
        (val) => {
          this.resource = val;
          console.debug("PATCH REQUEST successful value returned in body", val);
        },
        response => {
          this.alertifyService.error("ERROR:<br>" + response)
          console.debug("PATCH call in error", response);
        },
        () => {
          this.alertifyService.success("SUCCESS:<br> Parameters Saved on the Server")
          console.debug("The PATCH observable is now completed.");
          this.resourceCharacteristicUpdate = <Pick<ResourceUpdate, "resource_characteristic">>{}
          this.parametersChanged = false;
        }
      )
  }

  openPatchModal(action: string) {
    const modalRef = this.modalService.open(ModalSingleResourcesComponent);
    modalRef.componentInstance.parametersChanged = this.parametersChanged;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.resource = this.resource;
    modalRef.result.then((result: ResourceUpdate) => {
      console.error(result);
      this.resourceService
        .patchResource(this.resource.id, result)
        .subscribe(
          (val) => {
            this.resource = val;
            console.debug("PATCH call successful value returned in body", val);
          },
          response => {
            this.alertifyService.error("ERROR:<br>" + response)
            console.debug("PATCH call in error", response);
          },
          () => {
            this.alertifyService.success("SUCCESS:<br>ACTION: " + result.resource_characteristic[result.resource_characteristic.findIndex(e => e.name === 'action')].value.value + "<br> Changes Saved on the Server")
            console.debug("The PATCH observable is now completed.");
            this.resourceCharacteristicUpdate = <ResourceUpdate>{};
            this.parametersChanged = false;
          }
        )
    });
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(ModalDeleteResourceComponent);
    modalRef.componentInstance.resource = this.resource;
    modalRef.result.then((result: Resource) => {
      this.resourceService
        .deleteResource(result.id)
        .subscribe(
          (val) => {
            console.debug("DELETE call successful value returned in body", val);
          },
          response => {
            this.alertifyService.error("ERROR:<br>" + response)
            console.debug("DELETE call in error", response);
          },
          () => {
            this.router.navigate(['/']);
            this.alertifyService.success("SUCCESFULY DELETED<br>RESOURCE:<br>" + result.name);
          }
        )
    });
  }

  private initMap(): void {
    let coordinateX: number = this.resource.resource_characteristic[this.indexLocation].value.value[0];
    let coordinateY: number = this.resource.resource_characteristic[this.indexLocation].value.value[1];

    this.map = L.map("map", {
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
}

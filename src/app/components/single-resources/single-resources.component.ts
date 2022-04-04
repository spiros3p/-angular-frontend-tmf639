import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faLongArrowAltLeft, faTrashAlt, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { UiService } from 'src/app/services/ui.service';
import { ResourceService } from 'src/app/services/resource.service';
import { AlertifyService } from 'src/app/services/alertify.service';

import { ModalSingleResourcesParametersComponent } from '../modal-single-resources-parameters/modal-single-resources-parameters.component';
import { ModalSingleResourcesValuesComponent } from '../modal-single-resources-values/modal-single-resources-values.component';
import { ModalSingleResourcesActionComponent } from '../modal-single-resources-action/modal-single-resources-action.component';
import { ModalDeleteResourceComponent } from '../modal-delete-resource/modal-delete-resource.component';

import { Resource } from 'src/app/models/resource';
import { ResourceUpdate } from 'src/app/models/resourceUpdate';
import * as L from 'leaflet';

/** These variables are used to define the marker in the leaflet map */
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
 * This component displays the single Resource page and containes all the logic
 */
@Component({
  selector: 'app-single-resources',
  templateUrl: './single-resources.component.html',
  styleUrls: ['./single-resources.component.scss']
})
export class SingleResourcesComponent implements OnInit, AfterViewInit, OnDestroy {

  resource!: Resource;
  resourceCharacteristicUpdate!: Pick<ResourceUpdate, "resource_characteristic">;
  /** This property of Resource object is initialized here and is used to in the body of the PATCH requests for the Actions and Action parameters changes */
  activationFeaturePatch: Pick<ResourceUpdate, "activation_feature"> = {
    "activation_feature" : [{
      "name":"gNodeB_service",
      "feature_characteristic":[]
    }]
  };

  private map: any;
  subscriptionToIsAdmin!: Subscription;
  /** Boolean variable used to show/hide the Delete Button of the resource */
  isAdmin!: boolean;

  faUpload = faUpload;
  faEdit = faEdit;
  faLongArrowAltLeft = faLongArrowAltLeft;
  faTrashAlt = faTrashAlt;

  /** Variable to hold the index for the object with name:action of the array resource_characteristic in the Resource Object */
  indexAction?: number;
  /** Variable to hold the index for the object with name:action_parameter of the array resource_characteristic in the Resource Object */
  indexActionParameters?: number;
  /** Variable to hold the index for the object with name:location of the array resource_characteristic in the Resource Object */
  indexLocation?: number;
  /** Variable to hold the index for the object with name:ip of the array resource_characteristic in the Resource Object */
  indexIP?: number;
  /** Variable to hold the index for the object with name:supported_action of the array resource_characteristic in the Resource Object */
  indexSupportedActions?: number;

  noActionParametersSet!: boolean;
  /** Boolean variable to set when changes on Parameters happens and have not been sent with a patch request yet */
  parametersChanged: boolean = false;

  constructor(
    private resourceService: ResourceService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private uiService: UiService
  ) {
    /** Subscribe to a UI Service that checks for admin status and sets a boolean value to use for interface uses */
    this.subscriptionToIsAdmin =
      this.uiService
        .onCheckAdmin()
        .subscribe(
          (value) => (this.isAdmin = value)
        )
  }

  /**
   * On init 2 things take place.
   * a) Sends a request to the UI service to check for admin status.
   * b) Sends a request to retrieve the single resource 
   * if the resource is 'operational_status = disable' the router redirects to the homepage
   */
  ngOnInit(): void {
    this.uiService.checkAdmin();
    this.resourceService
      .retrieveResource(this._Activatedroute.snapshot.paramMap.get("id"))
      .subscribe(
        (resource) => {
          if (resource.operational_state === 'disable') {
            this.router.navigate(['/']);
            this.alertifyService.error("ERROR:<br> This Resource is not operational")
          }
          this.resource = resource;
          this.indexLocation = this.resource.resource_characteristic?.findIndex(e => e.name === 'location') || -1;
          this.indexIP = this.resource.resource_characteristic?.findIndex(e => e.name === 'IP') || -1;
          this.indexSupportedActions = this.resource.resource_characteristic?.findIndex(e => e.name === 'supported_actions') || -1;
          this.indexActionParameters = this.resource.resource_characteristic?.findIndex(e => e.name === 'action_parameters') || -1;
          if (this.indexActionParameters == -1) { this.noActionParametersSet = true };
        }
      )
  }

  /** Triggers the map method if the there is a 'name:location' property in the array resource_characteristic of the resource object */
  ngAfterViewInit(): void {
    if (this.indexLocation != -1) {
      this.initMap();
    }
  }

  ngOnDestroy(): void { }

  /** Method that resets the parameter changes that have not been already sent with a patch request to the server  */
  resetParameters() {
    this.parametersChanged = false;
    this.resourceService
      .retrieveResource(this._Activatedroute.snapshot.paramMap.get("id"))
      .subscribe(
        (resource) => this.resource.resource_characteristic![this.indexActionParameters!] = resource.resource_characteristic![this.indexActionParameters!])
  }

  /** 
   * Method that calls the ModalSingleResourcesValuesComponent 
   * And also sends the patchResource request when it gets the confirmation signal from the modal
   */
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

    /** 
   * Method that calls the ModalSingleResourcesValuesComponent 
   * It sets both the activationFeaturePatch Property and the resource_characteristic Property on the modal confirmation signal
   */
  openParametersModal() {
    try{
      const modalRef = this.modalService.open(ModalSingleResourcesParametersComponent);
      modalRef.componentInstance.resource = this.resource;
      modalRef.componentInstance.indexActionParameters = this.indexActionParameters;
      modalRef.result.then((result: Pick<ResourceUpdate, "resource_characteristic">) => {
        if (JSON.stringify(this.resource.resource_characteristic![this.indexActionParameters!].value.value) != JSON.stringify(result.resource_characteristic![this.indexActionParameters!].value.value)) {
          this.parametersChanged = true;
        }
        this.activationFeaturePatch.activation_feature![0].feature_characteristic.push(
          {
            "name": "action_parameters",
            "value":{
              "value": result.resource_characteristic![this.indexActionParameters!].value.value
            }
          }
        );
        this.resourceCharacteristicUpdate = result;
        this.resource.resource_characteristic = result.resource_characteristic;
      });
    } catch(err) {
      console.error(err);
    }
  }

  /** 
   * Method that sends the patchRequest
   * It is triggered from the "Save Changes" button in the Parameters section
   */
  uploadParameters() {    
    this.resourceService
      .patchResource(this.resource.id, this.activationFeaturePatch)
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
          this.activationFeaturePatch.activation_feature![0].feature_characteristic = [];
        }
      )
  }

  /** 
   * Method that calls the ModalSingleResourcesActionComponent 
   * And also sends the patchResource request when it gets the confirmation signal from the modal
   */
  openActionModal(action: string) {
    const modalRef = this.modalService.open(ModalSingleResourcesActionComponent);
    modalRef.componentInstance.parametersChanged = this.parametersChanged;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.resource = this.resource;
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
        .patchResource(this.resource.id, this.activationFeaturePatch)
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
            this.alertifyService.success("SUCCESS:<br>ACTION: " + result.resource_characteristic![result.resource_characteristic!.findIndex(e => e.name === 'action')].value.value + "<br> Changes Saved on the Server")
            console.debug("The PATCH observable is now completed.");
            // maybe remove V
            this.resourceCharacteristicUpdate = <ResourceUpdate>{};
            this.parametersChanged = false;
            this.activationFeaturePatch.activation_feature![0].feature_characteristic = [];
          }
        )
    });
  }

  /** 
  * Method that calls the ModalDeleteResourceComponent 
  * And also sends the deleteResource request when it gets the confirmation signal from the modal
  */
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

  /** 
   * Defines the Map method 
   * Check if there is 'location' in the resource_characteristic array happens before triggering the method
   */
  private initMap(): void {
    let coordinateX: number = this.resource.resource_characteristic![this.indexLocation!].value.value[0];
    let coordinateY: number = this.resource.resource_characteristic![this.indexLocation!].value.value[1];

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

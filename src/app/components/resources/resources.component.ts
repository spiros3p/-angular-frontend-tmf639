import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { switchMap } from 'rxjs/operators';

import { UiService } from 'src/app/services/ui.service';
import { ResourceService } from 'src/app/services/resource.service';
import { AlertifyService } from 'src/app/services/alertify.service';

import { Resource } from 'src/app/models/resource';
import { environment } from 'src/environments/environment';

/**
 * Main component of the / Route page
 * Where the Resource HTTP requests to the API happen
 */
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  /** Local reference of Resource array 
   * It is passed to children components to display the resources
  */
  resources!: Resource[];
  /** 
   * Second local reference of Resource array 
   * It is used to keep a copy of the total resources while the 'resources' is manipulated by included methods
  */
  allResources!: Resource[];

  /** Used in show/hide the Delete Button on each Resource item */
  isAdmin!: boolean;
  /** 
   * Used in toggling between list view and grid view of the displayed resources.
   * Each view has its own children component
   */
  showListView: boolean = environment.defaultListView;

  /** Subscription */
  subscriptionToListView!: Subscription;
  isAdminSubscription!: Subscription;
  timeInterval!: Subscription;

  /** Stores the last Operation State selection */
  selectedOpState: string = "null";
  /** Stores the last Resource Status selection */
  selectedResourceStatus: string = "null";
  /** Stores the last string typed in the search box */
  selectedSearchTerm: string = "";

  /**
   * The constructor
   * @param {ResourceService} resourceService The service for the Resources calls
   * @param {UiService} uiService The service for the UI changes
   * @param {alertifyService} alertifyService  The service for using Alertify
   */
  constructor(
    private resourceService: ResourceService,
    private uiService: UiService,
    private alertifyService: AlertifyService,
  ) {
    this.subscriptionToListView =
      this.uiService
        .onToggleListView()
        .subscribe((value) => (this.showListView = value));

    this.isAdminSubscription =
      this.uiService
        .onCheckAdmin()
        .subscribe(
          (value) => (this.isAdmin = value)
        )
  }

  /**
   *  On initialization 
   *  1. calls the UI service .checkAdmin() which shows/hides the menu tabs
   *  2. fetches the resources one time and then every 10 seconds
  */
  ngOnInit(): void {
    this.uiService.checkAdmin();
    /** GET /resource - 1 time - the first time */
    this.resourceService
      .listResource()
      .subscribe((response) => {
          this.resources = response;
          this.allResources = response;
      });
    /** Angular Polling - refreshing /resource every 10sec - after first 10sec */
    this.timeInterval = timer(10000, 10000)
      .pipe(
        switchMap(() => this.resourceService.listResource())
      )
      .subscribe((response) => {
          this.allResources = response;
          this.onFilterChange()
      })
  }

  /** Unsubscribe when the component is removed from view */
  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  /** 
   * Method to filter the displayed resources according to the selected 3 variables/filters 
   * 
  */
  onFilterChange() {
    this.resources = this.allResources.filter(
      t =>
        (this.selectedOpState == "null" || t.operational_state == this.selectedOpState) &&
        (this.selectedResourceStatus == "null" || t.resource_status == this.selectedResourceStatus) &&
        (!this.selectedSearchTerm || t.name?.toLocaleLowerCase().includes(this.selectedSearchTerm) || t.description?.toLocaleLowerCase().includes(this.selectedSearchTerm))
    )
  }

  /**
   * When text is typed in the search box it updates the stored value and calls the filter function to filter the resources
   * @param {string} value the input string typed in the search box
   */
  onSearchTermChange(value: string) {
    this.selectedSearchTerm = value;
    this.onFilterChange();
  }

  /**
   * When the select input changes it updates the stored value and calls the filter function to filter the resources
   * @param {string|any} value The operational state select value
   */
  onOpStateFilterChange(value: any) {
    this.selectedOpState = value;
    this.onFilterChange();
  }

  /**
   * When the select input changes it updates the stored value and calls the filter function to filter the resources
   * @param {string|any} value The resource status select value
   */
  onResourceStatusFilterChange(value: any) {
    this.selectedResourceStatus = value;
    this.onFilterChange();
  }

  /**
   * Method to delete a resource 
   * Calls the delete request on the service
   * Filters the diplayed resources removing the deleted one
   * @param {Resource} resource 
   */
  deleteResource(resource: Resource) {
    this.resourceService
      .deleteResource(resource.id)
      .subscribe(
        (val) => {
          console.log("DELETE call successful value returned in body", val);
        },
        response => {
          this.alertifyService.error("ERROR:<br>" + response)
          console.debug("DELETE call in error", response);
        },
        () => {
          this.resources = this.resources.filter(t => t.id !== resource.id)
          this.alertifyService.success("SUCCESFULY DELETED<br>RESOURCE:<br>" + resource.name);
        }
      )
  }

}

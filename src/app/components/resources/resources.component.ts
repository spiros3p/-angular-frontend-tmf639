import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { switchMap } from 'rxjs/operators';

import { UiService } from 'src/app/services/ui.service';
import { ResourceService } from 'api/resource.service';
import { AlertifyService } from 'src/app/services/alertify.service';

import { Resource } from 'model/resource';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  resources!: Resource[];
  allResources!: Resource[];

  isAdmin!: boolean;
  showListView: boolean = environment.defaultListView;

  subscriptionToListView!: Subscription;
  isAdminSubscription!: Subscription;
  timeInterval!: Subscription;

  selectedOpState: string = "null";
  selectedResourceStatus: string = "null";
  selectedSearchTerm: string = "";

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
        .onToggleAdmin()
        .subscribe(
          (value) => (this.isAdmin = value)
        )
  }

  ngOnInit(): void {
    this.uiService.toggleAdmin();
    // GET /resource - 1 time - the first time
    this.resourceService
      .listResource()
      .subscribe((resources) => {
        this.resources = resources;
        this.allResources = resources;
      });
    // angular polling - refreshing /resource every 10sec - after first 10sec
    this.timeInterval = timer(10000, 10000)
      .pipe(
        switchMap(() => this.resourceService.listResource())
      )
      .subscribe(
        (resources) => {
          this.allResources = resources;
          this.onFilterChange()
        }
      )
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  // filtering function that is being called at every filter change and polling refresh
  onFilterChange() {
    console.error()
    this.resources = this.allResources.filter(
      t =>
        (this.selectedOpState == "null" || t.operational_state == this.selectedOpState) &&
        (this.selectedResourceStatus == "null" || t.resource_status == this.selectedResourceStatus) &&
        (!this.selectedSearchTerm || t.name?.toLocaleLowerCase().includes(this.selectedSearchTerm) || t.description?.toLocaleLowerCase().includes(this.selectedSearchTerm))
    )
  }

  onSearchTermChange(value: string) {
    this.selectedSearchTerm = value;
    this.onFilterChange();
  }

  onOpStateFilterChange(value: any) {
    this.selectedOpState = value;
    this.onFilterChange();
  }

  onResourceStatusFilterChange(value: any) {
    this.selectedResourceStatus = value;
    this.onFilterChange();
  }

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

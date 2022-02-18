import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { faGripHorizontal, faList, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { Resource } from 'src/app/models/resource';

@Component({
  selector: 'app-resources-filter',
  templateUrl: './resources-filter.component.html',
  styleUrls: ['./resources-filter.component.scss']
})
export class ResourcesFilterComponent implements OnInit {

  @Input() resources!: Resource[];
  @Output() searchTermChange = new EventEmitter();
  @Output() resourceStatusFilterChange = new EventEmitter();
  @Output() opStateFilterChange = new EventEmitter();

  faAngleDown = faAngleDown;
  faGripHorizontal = faGripHorizontal;
  faList = faList;
  showResourceStatusLabel: boolean = true;
  showOpStateLabel: boolean = true;

  allResources!: Resource[];
  opStateList: any;
  resourceStatusList: any;
  selectedOpState: string = "null";
  selectedResourceStatus: string = "null";
  showListView: boolean = environment.defaultListView;
  subscriptionToListView!: Subscription;

  constructor(private uiService: UiService) {
    this.subscriptionToListView =
      this.uiService
        .onToggleListView()
        .subscribe(
          (value) => (this.showListView = value)
        );
  }

  ngOnChanges() {
    if (this.resources) {
      if (!this.allResources) {
        this.allResources = this.resources;
        this.resourceStatusList = [...new Set(this.resources.map(item => item.resource_status))]
        this.opStateList = [...new Set(this.resources.map(item => item.operational_state))]
      }
    }
  }

  ngOnInit(): void {
  }

  toggleListView(currentListView: boolean) {
    if (currentListView != this.showListView) {
      this.uiService.toggleListView(currentListView);
    }
  }

  onSearchTermChange(event: any) {
    this.searchTermChange.emit(event.target.value);
  }

  onOpStateChange(value: any) {
    this.opStateFilterChange.emit(value.value);
    if (value.value == "" || value.value == "null") {
      this.showOpStateLabel = true;
    } else {
      this.showOpStateLabel = false;
    }
  }

  onResourceStatusChange(value: any) {
    this.resourceStatusFilterChange.emit(value.value);
    if (value.value == "" || value.value == "null") {
      this.showResourceStatusLabel = true;
    } else {
      this.showResourceStatusLabel = false;
    }
  }
}

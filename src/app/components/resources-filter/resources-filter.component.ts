import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { faGripHorizontal, faList, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { Resource } from 'src/app/models/resource';

/** The Filter component displayed on the Resources page */
@Component({
  selector: 'app-resources-filter',
  templateUrl: './resources-filter.component.html',
  styleUrls: ['./resources-filter.component.scss']
})
export class ResourcesFilterComponent implements OnInit {

  @Input() resources!: Resource[];
  /** Emits the changes to the parent component (resource.component) to handle the logic */
  @Output() searchTermChange = new EventEmitter();
  @Output() resourceStatusFilterChange = new EventEmitter();
  @Output() opStateFilterChange = new EventEmitter();

  faAngleDown = faAngleDown;
  faGripHorizontal = faGripHorizontal;
  faList = faList;
  /** Trick to use the Label html element like a placeholder over the select html element when the default value is selected */
  showResourceStatusLabel: boolean = true;
  showOpStateLabel: boolean = true;

  initial: boolean = true;
  // allResources!: Resource[];
  opStateList: any;
  resourceStatusList: any;
  selectedOpState: string = "null";
  selectedResourceStatus: string = "null";
  showListView: boolean = environment.defaultListView;
  subscriptionToListView!: Subscription;

  /**
   * Contains a Subscribtion to the Ui change and updates the value, used in the styling of the view option buttons
   * @param uiService the Uiservice itself
   */
  constructor(private uiService: UiService) {
    this.subscriptionToListView =
      this.uiService
        .onToggleListView()
        .subscribe(
          (value) => (this.showListView = value)
        );
  }

  /** 
   * Fills the filters with the available states from the resources
   * Runs only the first time the component is loaded
   */
  ngOnChanges() {
    if (this.resources) {
      if (this.initial) {
        this.initial = false;
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

  /** 
   * Function called on search box typing
   * Emits the changes to the parent component (resource.component) to handle the logic 
   * @param event the change event triggering the function 
   */
  onSearchTermChange(event: any) {
    this.searchTermChange.emit(event.target.value);
  }

  /** 
   * Function called on select html element value change
   * Emits the changes to the parent component (resource.component) to handle the logic 
   * @param value the selected value from the select html element
   */
  onOpStateChange(value: any) {
    this.opStateFilterChange.emit(value.value);
    if (value.value == "" || value.value == "null") {
      this.showOpStateLabel = true;
    } else {
      this.showOpStateLabel = false;
    }
  }

  /** 
   * Function called on select html element value change
   * Emits the changes to the parent component (resource.component) to handle the logic 
   * @param value the selected value from the select html element
   */
  onResourceStatusChange(value: any) {
    this.resourceStatusFilterChange.emit(value.value);
    if (value.value == "" || value.value == "null") {
      this.showResourceStatusLabel = true;
    } else {
      this.showResourceStatusLabel = false;
    }
  }
}

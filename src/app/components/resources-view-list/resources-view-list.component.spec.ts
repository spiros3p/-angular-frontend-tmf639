import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesViewListComponent } from './resources-view-list.component';

describe('ResourcesViewListComponent', () => {
  let component: ResourcesViewListComponent;
  let fixture: ComponentFixture<ResourcesViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

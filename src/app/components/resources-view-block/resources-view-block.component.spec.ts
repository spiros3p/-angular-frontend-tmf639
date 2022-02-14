import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesViewBlockComponent } from './resources-view-block.component';

describe('ResourcesViewBlockComponent', () => {
  let component: ResourcesViewBlockComponent;
  let fixture: ComponentFixture<ResourcesViewBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesViewBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesViewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

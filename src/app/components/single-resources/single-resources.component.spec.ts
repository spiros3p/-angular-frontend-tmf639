import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleResourcesComponent } from './single-resources.component';

describe('SingleResourcesComponent', () => {
  let component: SingleResourcesComponent;
  let fixture: ComponentFixture<SingleResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleResourcesComponent } from './modal-single-resources.component';

describe('ModalSingleResourcesComponent', () => {
  let component: ModalSingleResourcesComponent;
  let fixture: ComponentFixture<ModalSingleResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

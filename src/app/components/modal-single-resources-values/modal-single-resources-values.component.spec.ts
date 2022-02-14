import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleResourcesValuesComponent } from './modal-single-resources-values.component';

describe('ModalSingleResourcesValuesComponent', () => {
  let component: ModalSingleResourcesValuesComponent;
  let fixture: ComponentFixture<ModalSingleResourcesValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleResourcesValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleResourcesValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

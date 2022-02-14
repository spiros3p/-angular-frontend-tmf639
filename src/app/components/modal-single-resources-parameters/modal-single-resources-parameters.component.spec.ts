import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleResourcesParametersComponent } from './modal-single-resources-parameters.component';

describe('ModalSingleResourcesParametersComponent', () => {
  let component: ModalSingleResourcesParametersComponent;
  let fixture: ComponentFixture<ModalSingleResourcesParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleResourcesParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleResourcesParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

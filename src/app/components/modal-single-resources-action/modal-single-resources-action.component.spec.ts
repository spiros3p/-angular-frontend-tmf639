import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleResourcesActionComponent } from './modal-single-resources-action.component';

describe('ModalSingleResourcesComponent', () => {
  let component: ModalSingleResourcesActionComponent;
  let fixture: ComponentFixture<ModalSingleResourcesActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleResourcesActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleResourcesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

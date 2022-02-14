import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceItemBlockComponent } from './resource-item-block.component';

describe('ResourceItemBlockComponent', () => {
  let component: ResourceItemBlockComponent;
  let fixture: ComponentFixture<ResourceItemBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceItemBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceItemBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

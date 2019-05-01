import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthworkindexComponent } from './healthworkindex.component';

describe('HealthworkindexComponent', () => {
  let component: HealthworkindexComponent;
  let fixture: ComponentFixture<HealthworkindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthworkindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthworkindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

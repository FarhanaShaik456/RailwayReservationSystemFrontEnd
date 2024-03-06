import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainListComponent } from './train-list.component';

describe('TrainListComponent', () => {
  let component: TrainListComponent;
  let fixture: ComponentFixture<TrainListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainListComponent]
    });
    fixture = TestBed.createComponent(TrainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainsComponent } from './search-trains.component';

describe('SearchTrainsComponent', () => {
  let component: SearchTrainsComponent;
  let fixture: ComponentFixture<SearchTrainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTrainsComponent]
    });
    fixture = TestBed.createComponent(SearchTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormUserComponent } from './issue-form-user.component';

describe('IssueFormUserComponent', () => {
  let component: IssueFormUserComponent;
  let fixture: ComponentFixture<IssueFormUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueFormUserComponent]
    });
    fixture = TestBed.createComponent(IssueFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

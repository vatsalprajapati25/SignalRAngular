import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallinfoDialogComponent } from './callinfo-dialog.component';

describe('CallinfoDialogComponent', () => {
  let component: CallinfoDialogComponent;
  let fixture: ComponentFixture<CallinfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallinfoDialogComponent]
    });
    fixture = TestBed.createComponent(CallinfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

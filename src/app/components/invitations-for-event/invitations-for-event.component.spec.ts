import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsForEventComponent } from './invitations-for-event.component';

describe('InvitationsForEventComponent', () => {
  let component: InvitationsForEventComponent;
  let fixture: ComponentFixture<InvitationsForEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationsForEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationsForEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

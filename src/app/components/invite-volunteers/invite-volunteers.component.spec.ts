import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteVolunteersComponent } from './invite-volunteers.component';

describe('InviteVolunteersComponent', () => {
  let component: InviteVolunteersComponent;
  let fixture: ComponentFixture<InviteVolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteVolunteersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

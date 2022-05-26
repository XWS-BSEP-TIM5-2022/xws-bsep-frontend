import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePublicComponent } from './user-profile-public.component';

describe('UserProfilePublicComponent', () => {
  let component: UserProfilePublicComponent;
  let fixture: ComponentFixture<UserProfilePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

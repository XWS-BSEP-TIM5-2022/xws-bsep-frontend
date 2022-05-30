import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterestsComponent } from './update-interests.component';

describe('UpdateInterestsComponent', () => {
  let component: UpdateInterestsComponent;
  let fixture: ComponentFixture<UpdateInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

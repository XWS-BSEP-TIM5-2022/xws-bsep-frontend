import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredUserFeedComponent } from './unregistered-user-feed.component';

describe('UnregisteredUserFeedComponent', () => {
  let component: UnregisteredUserFeedComponent;
  let fixture: ComponentFixture<UnregisteredUserFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredUserFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredUserFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

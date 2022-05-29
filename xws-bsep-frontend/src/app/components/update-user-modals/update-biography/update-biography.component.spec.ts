import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBiographyComponent } from './update-biography.component';

describe('UpdateBiographyComponent', () => {
  let component: UpdateBiographyComponent;
  let fixture: ComponentFixture<UpdateBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBiographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

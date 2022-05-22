import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDislikesComponent } from './post-dislikes.component';

describe('PostDislikesComponent', () => {
  let component: PostDislikesComponent;
  let fixture: ComponentFixture<PostDislikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDislikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDislikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

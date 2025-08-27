import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopreviewsComponent } from './shopreviews.component';

describe('ShopreviewsComponent', () => {
  let component: ShopreviewsComponent;
  let fixture: ComponentFixture<ShopreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

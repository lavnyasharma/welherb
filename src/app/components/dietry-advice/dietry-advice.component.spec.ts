import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietryAdviceComponent } from './dietry-advice.component';

describe('DietryAdviceComponent', () => {
  let component: DietryAdviceComponent;
  let fixture: ComponentFixture<DietryAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietryAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietryAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

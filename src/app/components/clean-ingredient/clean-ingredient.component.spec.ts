import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanIngredientComponent } from './clean-ingredient.component';

describe('CleanIngredientComponent', () => {
  let component: CleanIngredientComponent;
  let fixture: ComponentFixture<CleanIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleanIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsDescComponent } from './ingredients-desc.component';

describe('IngredientsDescComponent', () => {
  let component: IngredientsDescComponent;
  let fixture: ComponentFixture<IngredientsDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

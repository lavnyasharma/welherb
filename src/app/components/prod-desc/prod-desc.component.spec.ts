import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDescComponent } from './prod-desc.component';

describe('ProdDescComponent', () => {
  let component: ProdDescComponent;
  let fixture: ComponentFixture<ProdDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

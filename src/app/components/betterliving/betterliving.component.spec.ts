import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterlivingComponent } from './betterliving.component';

describe('BetterlivingComponent', () => {
  let component: BetterlivingComponent;
  let fixture: ComponentFixture<BetterlivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetterlivingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetterlivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripsComponent } from './strips.component';

describe('StripsComponent', () => {
  let component: StripsComponent;
  let fixture: ComponentFixture<StripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

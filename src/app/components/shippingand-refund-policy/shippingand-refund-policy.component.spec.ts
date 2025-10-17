import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingandRefundPolicyComponent } from './shippingand-refund-policy.component';

describe('ShippingandRefundPolicyComponent', () => {
  let component: ShippingandRefundPolicyComponent;
  let fixture: ComponentFixture<ShippingandRefundPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingandRefundPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingandRefundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

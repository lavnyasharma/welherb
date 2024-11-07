import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDoctorComponent } from './contact-doctor.component';

describe('ContactDoctorComponent', () => {
  let component: ContactDoctorComponent;
  let fixture: ComponentFixture<ContactDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

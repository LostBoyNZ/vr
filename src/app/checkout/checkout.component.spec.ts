import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CheckoutComponent, FormTypes, IBookingFormDetails, IQuestion} from './checkout.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  const mockQuestions: IQuestion[] = [{
    question: 'What type of rental is this?',
    type: FormTypes.RADIO,
    name: 'rentalType',
    choices: ['individual', 'company'],
  }];
  const mockUserFormData: IBookingFormDetails = {
    rentalType: 'personal',
    shippingAddress: null,
    postcode: 1000,
    ruralDelivery: 'non-rural',
    rentalDates: { begin: new Date('2019-12-03'), end: new Date('2019-12-04') },
    productChoice: '',
    name: 'test user',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ CheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.userFormData = mockUserFormData;
    fixture.detectChanges();
  });

  describe('The check for overnight postage being required', () => {
    it('should return false when given a date five days away', () => {
      const mockToday = new Date('2019-11-26');
      const result: boolean = component.isExtraPostageCharge(mockToday);

      expect(result).toBeFalsy();
    });

    it('should return false when given a date four days away', () => {
      const mockToday = new Date('2019-11-27');
      const result: boolean = component.isExtraPostageCharge(mockToday);

      expect(result).toBeFalsy();
    });

    it('should return true when given a date three days away', () => {
      const mockToday = new Date('2019-11-28');
      const result: boolean = component.isExtraPostageCharge(mockToday);

      expect(result).toBeTruthy();
    });

    it('should return true when given a date two days away', () => {
      const mockToday = new Date('2019-11-29');
      const result: boolean = component.isExtraPostageCharge(mockToday);

      expect(result).toBeTruthy();
    });

    it('should return true when given a date one day away', () => {
      const mockToday = new Date('2019-12-02');
      const result: boolean = component.isExtraPostageCharge(mockToday);

      expect(result).toBeTruthy();
    });
  });

  describe('The check that the begin date is valid', () => {
    it('should return true when given a valid date', () => {
      const mockToday = new Date('2019-11-26');
      const result: boolean = component.isBeginDateValid(mockToday);

      expect(result).toBeTruthy();
    });

    it('should return false when given a weekend date to begin the rental on', () => {
      const mockToday = new Date('2019-11-30');
      component.userFormData = {
        rentalType: 'personal',
        shippingAddress: null,
        postcode: 1000,
        ruralDelivery: 'non-rural',
        rentalDates: { begin: new Date('2019-11-30'), end: new Date('2019-12-04') },
        productChoice: '',
        name: 'test user',
      };
      const result: boolean = component.isBeginDateValid(mockToday);

      expect(result).toBeFalsy();
    });
  });
});

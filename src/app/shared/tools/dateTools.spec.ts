import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTools} from './dateTools';

import {NO_ERRORS_SCHEMA} from '@angular/core';
/*
describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  const mockQuestions = [{
    question: 'What type of rental is this?',
    type: FormTypes.RADIO,
    name: 'rentalType',
    choices: ['individual', 'company'],
  }];

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
    fixture.detectChanges();
  });

  it('should include a test but I have not written it yet', () => {
    component.questions = mockQuestions;
    expect(component).toBeTruthy();
  });
});
*/

describe('Date Tools', () => {
  describe('date tools', () => {
    it('should return true', () => {
      // --- Arrange

      // --- Act
      const actual = DateTools.returnTrue();

      // --- Assert
      expect(actual).toEqual(true);
    });
  });
});

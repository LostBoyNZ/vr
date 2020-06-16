import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDynamicForm } from '../dynamic-field.directive';
import { fromEvent, Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AddressTypes, AddressSuggestionTools } from '../../tools/addressSuggestionTools';
import * as _ from "lodash";

export interface IInputAddress extends IInput {
  acceptedAddressTypes?: AddressTypes[],
}

@Component({
  selector: "app-form-address-auto-complete",
  templateUrl: "./form-address-auto-complete.component.html",
  styleUrls: ['./form-address-auto-complete.component.scss'],
})

export class FormAddressAutoCompleteComponent implements OnInit {
  @ViewChild('autoCompleteInput', { static: true }) autoCompleteInput: ElementRef;

  @Input()
  config: IInputAddress;
  @Input()
  group: FormGroup;

  public text: string;

  control = new FormControl();
  addresses: Observable<string[]>;
  allAddresses: string[];

  ngOnInit() {
    const addressTypesToFilterBy = this.config.acceptedAddressTypes;

    fromEvent(this.autoCompleteInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => /[A-Za-z]/.test(res.toString())),
      debounceTime(50),
      distinctUntilChanged(),
    ).subscribe(async (address: string) => {
      const addressSuggestions = await AddressSuggestionTools.getApiAddressSuggestions(address);

      if (addressSuggestions) {
        this.addresses = new Observable<string[]>((observer: Observer<string[]>) => {
          observer.next(this.allAddresses = addressSuggestions.map(address => address.FullAddress));
          if (addressTypesToFilterBy) {
            observer.next(addressSuggestions.filter(
              address => _.includes(address['SourceDesc'], addressTypesToFilterBy)
            ).map(address => address.FullAddress));
          }
        });
      }
    });
  }

  public inputMatchesAutoCompleteSuggestion() {
    return _.includes(this.allAddresses, this.group.value[this.config.name]);
  }

  get input() {
    return this.group.get(this.config.name);
  }

  get warningMessage() {
    return this.config.getWarning && this.config.getWarning(this.group);
  }

  get inputType() {
    return this.config.inputType ? this.config.inputType : 'text';
  }
}

export interface IInput extends IDynamicForm {
  defaultValue?: string;
  placeholder?: string;
  isDisplayed: boolean;
  readOnly?: boolean;
  getWarning?: Function;
  inputType?: string;
}

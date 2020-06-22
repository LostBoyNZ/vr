import {Component, Inject} from '@angular/core';
import { CreateDynamicForm } from '../../shared/forms/create-dynamic-form';
import { RentalTypes, ShippingAddressTypes } from '../checkout.component';
import { CustomFormValidators } from '../../shared/forms/custom-form.validators';
import {AddressSuggestionTools, AddressTypes} from '../../shared/tools/addressSuggestionTools';
import {DynamicFormConfig} from '../../shared/forms/dynamic-form.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogSimpleComponent} from '../../shared/components/dialog-simple/dialog-simple.component';
import {ConfirmDialogService} from '../../shared/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  public formGroup: FormGroup;
  public customErrorMessage = 'Custom error message';
  public isSubmitting = false;
  public formQuestions = [
    CreateDynamicForm.radioButtons(
      "What type of rental is this?",
      "rentalType",
      null,
      [
        { name: RentalTypes.INDIVIDUAL, value: RentalTypes.INDIVIDUAL.valueOf() },
        { name: RentalTypes.COMPANY, value: RentalTypes.COMPANY.valueOf() }
      ]
    ),
    CreateDynamicForm.radioButtons(
      "Where would you like it delivered to?",
      "shippingAddressType",
      null,
      [
        { name: ShippingAddressTypes.HOME, value: ShippingAddressTypes.HOME.valueOf() },
        { name: ShippingAddressTypes.BUSINESS, value: ShippingAddressTypes.BUSINESS.valueOf() },
        { name: ShippingAddressTypes.COLLECTION_POINT, value: ShippingAddressTypes.COLLECTION_POINT.valueOf() },
      ]
    ),
    CreateDynamicForm.input(
      "What is the business name?",
      "companyName",
      "",
      "",
      [
        CustomFormValidators.isRequired,
      ],
      true,
      false,
      null,
    ),
    CreateDynamicForm.addressAutoComplete(
      "What address would you like it delivered to?",
      "shippingAddress",
      "",
      "",
      [
        CustomFormValidators.isRequired,
      ],
      true,
      false,
      null,
      "text",
      [AddressTypes.POSTAL],
    ),
    CreateDynamicForm.footerButtons({
      buttons: [
        {
          label: 'NEXT',
          type: 'submit',
          callbackFn: this.next,
          closeAfterCallback: false,
          // isButtonHidden: this.isFormInvalid,
          isRefreshing: () => this.isSubmitting,
        },
      ],
      customErrorMessage: () => (this.customErrorMessage ? this.customErrorMessage : ''),
    }),
  ];

  animal: string;
  name: string;

  public addressFormConfig: DynamicFormConfig = {
    inputs: this.formQuestions,
  };

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  constructor(public dialog: MatDialog, private fb: FormBuilder, private dialogService: ConfirmDialogService) {}

  ngOnInit() {
    const options = {
      title: 'Title',
      message: 'Message',
      cancelText: 'Cancel',
      confirmText: 'Confirm'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log('CONFIRMED YO: ', confirmed);
        //do something if confirmed is true
      }
    });
  }

  submitted(event) {
    console.log('event: ', event);
  }

  isFormInvalid(formGroup: FormGroup): boolean {
    return formGroup && !formGroup.valid;
  }

  public openDialog(): void {
    // this.formGroup = this.fb.group({
    //   address: ['99 Something Road', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    // });

    this.formGroup = this.fb.group({
    });

    const myFormControls = [{
      formControl: new FormControl('Default', [Validators.required, Validators.email]),
      label: 'email',
    }];

    const dialogRef = this.dialog.open(DialogSimpleComponent, {
      width: '250px',
      data: {title: 'Yo yo', myForm: myFormControls, form: this.formGroup}
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with the result: ', result);
      this.animal = result;
    });
  }

  public async next(event) {
    console.log('event: ', event);
    const address = event.value.shippingAddress;
    const addressIsValid = await AddressSuggestionTools.addressMatchesOneOrMoreSuggestions(address, []);
    console.log('addressIsValid: ', addressIsValid);

    this.openDialog();

    if (addressIsValid) {
      console.log('Show next form page');
    } else {
      console.log('Invalid address, check');
    }
  }
}



/*

import { CreateDynamicForm } from '../shared/forms/create-dynamic-form';
import { CustomFormValidators } from '../shared/forms/custom-form.validators';
import { get, isEmpty, last } from 'lodash';
import { IPasswordConfiguration, UserAccount } from './user-management.type';
import { Md5 } from 'ts-md5/dist/md5';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormConfig, DynamicFormInput } from '../shared/forms/dynamic-form.component';
import { IFooterButton } from '../shared/forms/form-components/form-footer-buttons.component';
import InputMessage from '../shared/modal/inputs/inputMessage';

export class UserManagementUtil {
    public static getAddUserFormConfig(
        saveUserFn: (form: FormGroup) => any,
        allUsers: UserAccount[],
        supportsUserPrivilege: boolean,
    ) {
        const input = [
            this.userNameInput(allUsers),
            this.passwordInput(
                'ACCOUNT_MANAGEMENT.PASSWORD',
                'newPassword',
                'ACCOUNT_MANAGEMENT.PASSWORD_PLACEHOLDER',
            ),
            this.passwordInput(
                'ACCOUNT_MANAGEMENT.CONFIRM_PASSWORD',
                'passwordConfirmation',
                'ACCOUNT_MANAGEMENT.PASSWORD_CONFIRMATION_PLACEHOLDER',
            ),
            this.formFooter(saveUserFn),
        ];
        if (supportsUserPrivilege) {
            input.splice(3, 0, this.privilegeInput());
        }

        return {
            inputs: input,
            validators: UserManagementUtil.formValueEqualsValidator(),
        };
    }

    public static getEditPasswordFormConfig(
        editPasswordFn: (form: FormGroup) => any,
        user: UserAccount,
    ) {
        const username = get(user, 'username', null);
        return {
            inputs: [
                this.readOnlyUsernameInput(username),
                this.passwordInput(
                    'ACCOUNT_MANAGEMENT.NEW_PASSWORD',
                    'newPassword',
                    'ACCOUNT_MANAGEMENT.NEW_PASSWORD_PLACEHOLDER',
                ),
                this.passwordInput(
                    'ACCOUNT_MANAGEMENT.CONFIRM_PASSWORD',
                    'passwordConfirmation',
                    'ACCOUNT_MANAGEMENT.PASSWORD_CONFIRMATION_PLACEHOLDER',
                ),
                this.formFooter(editPasswordFn),
            ],
            validators: UserManagementUtil.formValueEqualsValidator(),
        };
    }

    public static getEditPrivilegeFormConfig(
        editPrivilegeFn: (form: FormGroup) => any,
        user: UserAccount,
    ) {
        const username = get(user, 'username', null);
        const privilege = String(get(user, 'privilege', null));
        return {
            inputs: [
                this.readOnlyUsernameInput(username),
                this.privilegeInput(privilege),
                this.formFooter(editPrivilegeFn),
            ],
        };
    }

    public static getDeleteUserFromConfig(confirmMessage: string) {
        return {
            inputs: [
                {
                    type: 'message',
                    value: confirmMessage,
                },
                this.deleteModalFormFooter(),
            ],
        };
    }

    private static getFormFooterInput(config: DynamicFormConfig) {
        return last(config.inputs) as DynamicFormInput;
    }

    private static setCustomErrMsg(config: DynamicFormConfig, errMsg: string) {
        const formFooter = this.getFormFooterInput(config);
        formFooter.customErrorMessage = errMsg;
    }

    private static setRefreshing(config: DynamicFormConfig, isSubmitting: boolean) {
        const formFooter = this.getFormFooterInput(config);
        if (formFooter.buttons) {
            formFooter.buttons.forEach((button: IFooterButton) => {
                button.isButtonDisabled = () => isSubmitting;
                if (button.type === 'submit') {
                    button.isRefreshing = () => isSubmitting;
                }
            });
        }
    }

    public static changeFooterStatus(
        config: DynamicFormConfig,
        errMsg: string,
        isSubmitting: boolean,
    ) {
        this.setCustomErrMsg(config, errMsg);
        this.setRefreshing(config, isSubmitting);
    }

    public static getPasswordConfig(password: string): IPasswordConfiguration {
        return {
            password: password,
            encoded: false,
            config_encoding: 'PASSWORD_ENCODING_ENCODED',
        } as IPasswordConfiguration;
    }

    private static userNameInput(users?: UserAccount[], username?: string) {
        const usernames: string[] = !isEmpty(users) ? users.map(user => user.username) : [];
        return CreateDynamicForm.input(
            'ACCOUNT_MANAGEMENT.USER_NAME',
            'username',
            'ACCOUNT_MANAGEMENT.USERNAME_PLACEHOLDER',
            username,
            [
                CustomFormValidators.isRequired,
                CustomFormValidators.noSpacesOnlyAlphaNumeric,
                CustomFormValidators.maxLength(63),
                CustomFormValidators.isUserExist(usernames),
            ],
        );
    }

    private static passwordInput(label: string, name: string, placeHolder: string) {
        return CreateDynamicForm.input(
            label,
            name,
            placeHolder,
            null,
            [
                CustomFormValidators.isRequired,
                CustomFormValidators.maxLength(31),
                CustomFormValidators.isAsciiPrintable,
            ],
            true,
            false,
            null,
            'password',
        );
    }

    private static getInput = (inputName: string) => (form: FormGroup): string => {
        return form.controls[inputName] ? form.controls[inputName].value : null;
    };

    private static privilegeInput(privilege?: string) {
        return CreateDynamicForm.input(
            'ACCOUNT_MANAGEMENT.PRIVILEGE',
            'privilege',
            'ACCOUNT_MANAGEMENT.PRIVILEGE_PLACEHOLDER',
            privilege,
            [
                CustomFormValidators.isRequired,
                CustomFormValidators.isNumeric,
                CustomFormValidators.noDecimals,
                CustomFormValidators.range(1, 15),
            ],
            true,
            false,
            this.getPrivilegeWarning,
        );
    }

    private static getPrivilegeWarning(formGroup: FormGroup): string {
        const control = formGroup.controls['privilege'] as FormControl;
        if (control && control.value) {
            const convertedValue = parseFloat(control.value) || control.value;
            return convertedValue > 0 &&
                convertedValue < 15 &&
                Number.isInteger(convertedValue)
                ? 'ACCOUNT_MANAGEMENT.PRIVILEGE_WARNING'
                : '';
        }
    }

    public static formFooter(callbackFn: (form: FormGroup) => any) {
        return CreateDynamicForm.footerButtons({
            buttons: [
                {
                    label: 'CANCEL',
                    type: 'cancel',
                    callbackFn: null,
                    closeAfterCallback: true,
                    isButtonDisabled: () => false,
                },
                {
                    label: 'SAVE',
                    type: 'submit',
                    callbackFn,
                    closeAfterCallback: false,
                    isButtonDisabled: this.isFormInvalid,
                },
            ],
        });
    }

    public static deleteModalFormFooter() {
        return CreateDynamicForm.footerButtons({
            buttons: [
                {
                    label: 'CANCEL',
                    type: 'cancel',
                    callbackFn: () => null,
                    closeAfterCallback: true,
                    isButtonDisabled: () => false,
                },
                {
                    label: 'DELETE',
                    type: 'submit',
                    callbackFn: () => null,
                    closeAfterCallback: false,
                    isButtonDisabled: () => false,
                },
            ],
        });
    }

    private static formValueEqualsValidator = () => [
        CustomFormValidators.checkFormValueEquals(
            [
                UserManagementUtil.getInput('newPassword'),
                UserManagementUtil.getInput('passwordConfirmation'),
            ],
            'ACCOUNT_MANAGEMENT.PASSWORDS_MUST_MATCH',
        ),
    ];

    private static readOnlyUsernameInput(username: string) {
        return CreateDynamicForm.input(
            'ACCOUNT_MANAGEMENT.USER_NAME_READONLY',
            'username',
            'ACCOUNT_MANAGEMENT.USERNAME_PLACEHOLDER',
            username,
            null,
            true,
            true,
        );
    }

    private static isFormInvalid(formGroup: FormGroup): boolean {
        return formGroup && !formGroup.valid;
    }
}

 */

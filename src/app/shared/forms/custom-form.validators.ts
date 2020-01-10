import { FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { get, includes, isEmpty, isInteger, isEqual } from 'lodash';

export interface IErrorMessage {
    key: string;
    params?: Object;
}

@Injectable()
export class CustomFormValidators extends Validators {
    static noSpacesOnlyAlphaNumeric(control: FormControl) {
        if (control.value) {
            return CustomFormValidators.alphaNumericOnlyNoSpacesUnderscoreAndDash(
                control.value,
            )
                ? null
                : { key: 'ENTITY_NAME_ERROR' };
        }
    }

    static noSpacesOnlyAlphaNumericDotDashUnderscoreHyphen(control: FormControl) {
        if (control.value) {
            return CustomFormValidators.alphaNumericDotDashUnderscoreHyphenOnlyNoSpaces(
                control.value,
            )
                ? null
                : { key: 'CONTAINERS.INSTANCE.NAME_ERROR' };
        }
    }

    static noSpacesOnlyNumericComma(control: FormControl) {
        if (control.value) {
            return CustomFormValidators.numericCommaOnlyNoSpaces(control.value)
                ? null
                : { key: 'CONTAINERS.INSTANCE.CPU_LIMIT_ERROR' };
        }
    }

    static doesNotContainThis = (target: string, errorMessage?: string) => (
        text: FormControl,
    ) => {
        if (text.value) {
            const key = errorMessage || 'PATTERN_DOES_NOT_CONTAIN_THIS';
            return includes(text.value, target) ? { key, params: { target } } : null;
        }
    }

    static isRequired(text: FormControl): IErrorMessage {
        return text.value ? null : { key: 'REQUIRED_FIELD' };
    }

    static isNumeric(control: FormControl): IErrorMessage {
        if (!control.value) {
            return;
        }
        return isNaN(control.value) ? { key: 'NUMBER_FIELD' } : null;
    }

    static noDecimals(control: FormControl) {
        if (!control.value) {
            return;
        }
        return control.value.indexOf('.') !== -1 ? { key: 'INTEGER_ONLY_ERROR' } : null;
    }

    static arrayIsRequired(text: FormControl): IErrorMessage {
        if (text.value) {
            return text.value.length ? null : { key: 'REQUIRED_FIELD' };
        }
    }

    static range = (min: number, max: number) => (text: FormControl) => {
        if (!text.value) {
            return;
        }
        const value = Number(text.value);
        const valid = value >= min && value <= max;
        return valid ? null : { key: 'VALUE_MUST_BE_IN_RANGE', params: { min, max } };
    };

    static maxLength = (length: number, errorMessage?: string) => (text: FormControl) => {
        if (!text.value) {
            return;
        }
        const key = errorMessage || 'VALUE_EXCEED_MAX_LENGTH';
        return text.value.length > length ? { key, params: { length } } : null;
    };

    static isAlphaNumericDotDashUnderscoreHyphenSlashOnlyNoSpaces(
        control: FormControl,
    ): IErrorMessage {
        if (control.value) {
            return CustomFormValidators.alphaNumericDotDashUnderscoreHyphenSlashOnlyNoSpaces(
                control.value,
            )
                ? null
                : { key: 'PATTERN_ALPHANUMERIC_DASH_UNDERSCORE_DOT_SLASH' };
        }
    }

    static isNoQuotesForwardSlashQuestionMarkOrSpaces(control: FormControl): IErrorMessage {
        if (control.value) {
            return CustomFormValidators.noQuotesForwardSlashQuestionMarkOrSpaces(control.value)
                ? null
                : { key: 'PATTERN_NO_QUOTES_BACKSLASH_QUESTION_MARK_SPACES' };
        }
    }

    static isAsciiPrintable(control: FormControl): IErrorMessage {
        if (control.value) {
            return CustomFormValidators.asciiPrintable(control.value)
                ? null
                : { key: 'PATTERN_PRINTABLE' };
        }
    }

    static alphaNumericOnlyNoSpacesUnderscoreAndDash(value: string) {
        return /^[a-zA-Z0-9_-]*$/.test(value);
    }

    static numericCommaOnlyNoSpaces(value: string) {
        return /^[0-9,]*$/.test(value);
    }

    static alphaNumericDotDashUnderscoreHyphenSlashOnlyNoSpaces(value: string) {
        return /^[a-zA-Z0-9\\/._-]*$/.test(value);
    }

    static alphaNumericDotDashUnderscoreHyphenOnlyNoSpaces(value: string) {
        return /^[a-zA-Z0-9._-]*$/.test(value);
    }

    static noQuotesForwardSlashQuestionMarkOrSpaces(value: string) {
        return /^[a-zA-Z0-9\\._~`!@#$%^&*()+={}[\]|:;'<>,-]*$/.test(value);
    }

    static asciiPrintable(value: string) {
        return /^[ -~]+$/.test(value);
    }
}

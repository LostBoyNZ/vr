import {isNumeric} from 'rxjs/internal-compatibility';

export class Validators {
  public isNumeric(value: string) {
    return isNumeric(value);
  }

  public isAtLeastThisLong(value: string, minLength: number) {
    return value.length >= minLength;
  }

  public isThisLongOrLess(value: string, maxLength: number) {
    return value.length <= maxLength;
  }
}

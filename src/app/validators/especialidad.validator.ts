import { AbstractControl } from '@angular/forms';

export function urlValidator(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.me')) {
    return { urlValid: true };
  }
  return null;
}
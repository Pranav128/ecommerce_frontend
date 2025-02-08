import { AbstractControl } from "@angular/forms";

export class CustomValidator {
    static NoWhite(control: AbstractControl): { [key: string]: any } | null {
        const val = control.value;
        if (val != null && val.trim().length === 0) {
          return { whiteSpace: true };
        }
        return null;
      }
}

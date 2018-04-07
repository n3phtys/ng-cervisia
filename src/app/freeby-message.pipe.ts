import { Pipe, PipeTransform } from '@angular/core';
import { DonationDefaultMessage } from './constants.locale';

@Pipe({name: 'freebyMessage'})
export class FreebyMessagePipe implements PipeTransform {
  transform(value: string): string {
    if (value != null && value.trim().length > 0) {
      return value.substring(0, 30);
    } else {
      return DonationDefaultMessage;
    }
  }
}
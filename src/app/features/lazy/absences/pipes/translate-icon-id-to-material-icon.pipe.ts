import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateIconIdToMaterialIcon',
})
export class TranslateIconIdToMaterialIconPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }

    switch (value) {
      case 'cf5d5560-ab2e-4070-14b6-08d9f11a0528': {
        // Annual leave
        return 'beach_access';
      }
      case 'eb798d14-71b0-47d5-14ba-08d9f11a0528': {
        // Holiday
        return 'today';
      }
      case '926aaeff-f37c-4846-14b8-08d9f11a0528': {
        // Business leave
        return 'work_off';
      }

      case 'd267f5ec-9e12-41d4-14bb-08d9f11a0528': {
        // Maternity leave
        return 'child_friendly';
      }

      case '52ccba5b-c9e1-46d1-14bc-08d9f11a0528': {
        // Paternity leave
        return 'child_friendly';
      }

      case 'c29eba72-2541-4665-14b7-08d9f11a0528': {
        // Sick leave
        return 'sick';
      }

      case 'abfc9c30-c7b6-42ae-14b9-08d9f11a0528': {
        // Study leave
        return 'school';
      }

      case 'f486edeb-cb07-4adc-14bd-08d9f11a0528': {
        // Surplus hours
        return 'hourglass_full';
      }
      default: {
        return '';
      }
    }
  }
}

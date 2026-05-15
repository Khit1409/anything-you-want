import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseFormDataJsonPipe implements PipeTransform {
  transform(value: any) {
    if (value.data) {
      return JSON.parse(value.data);
    }

    return value;
  }
}

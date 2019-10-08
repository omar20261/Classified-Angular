import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLimit'
})
export class StrLimitPipe implements PipeTransform {
  transform(value: any,...args): any {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    let trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}

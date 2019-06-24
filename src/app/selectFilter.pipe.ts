import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "selectfilter",
  pure: false
})

export class SelectFilterPipe implements PipeTransform {
  transform(input, args) {
    let output = [];

    if (args === ">10") {
      return output = input.filter(v => v.value > 10);
    }

    if (args === ">100") {
      return output = input.filter(v => v.value > 100);
    }

    if (args === ">200") {
      return output = input.filter(v => v.value > 200);
    }

    return input;
  }
}

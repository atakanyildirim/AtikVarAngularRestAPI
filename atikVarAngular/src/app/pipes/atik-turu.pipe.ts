import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atikTuru'
})
export class AtikTuruPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch(value){
      case 1:
        return "Atık Pil";
      case 2:
        return "Kağıt Atık";
      case 3:
        return "Plastik Atık";
      case 4:
        return "Cam Atık";
    }
  }

}

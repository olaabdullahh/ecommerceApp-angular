import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject:any[] , term:string): any[] {
    return arrayOfObject.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase()));
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumPipe'
})
export class EnumPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        keys.push({key: enumMember, value: value[enumMember]});
        console.log("enum member: ", value[enumMember]);
      } 
  
    //for (let key in value) {
    //  keys.push({key: key, value: value[key]);
    }
    return keys;
  }

}

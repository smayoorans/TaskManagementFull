import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './models/models';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(value: Task[], ...args: string[]): Task[] {

    const searchText = args[0];

    return value.filter(a => a.title.toLowerCase().includes(searchText.toLowerCase())
    || a.description.toLowerCase().includes(searchText.toLowerCase()));
  }

}

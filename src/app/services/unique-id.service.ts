import { Injectable } from '@angular/core';
import { RecordService } from './record.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueIDService {

  constructor(private recordService: RecordService) { }
  get() {
    if (this.recordService.list().length > 0) {
      let greatestID = this.recordService.list().map(rec => rec.id).reduce((a, b) => Math.max(a, b));
      return greatestID + 1;
    }
    return 1;
  }

}

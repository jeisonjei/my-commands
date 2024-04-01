import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecordItem } from '../../models/interfaces';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  copied = false;
  copy(arg0: string) {
    navigator.clipboard.writeText(arg0);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
  constructor(private recordService: RecordService) { }

  deleteRecord() {
    this.recordService.delete(this.recordItem);
  }
  @Input() recordItem: RecordItem;
  isLink(str) {
    // Regular expression to match URLs
    var urlPattern = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    // Check if the string matches the URL pattern
    return urlPattern.test(str);
  }
}

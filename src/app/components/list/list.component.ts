import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecordItem } from '../../models/interfaces';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [ListItemComponent]
})
export class ListComponent {
  
  @Input() records: RecordItem[] = [];
}

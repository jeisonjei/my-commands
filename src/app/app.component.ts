import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AddFormComponent } from "./components/add-form/add-form.component";
import { RecordItem } from './models/interfaces';
import { ListComponent } from "./components/list/list.component";
import { RecordService } from './services/record.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, AddFormComponent, ListComponent]
})

export class AppComponent implements OnInit, AfterViewInit {
  search(arg0: string) {
    if (arg0) {
      this.searchNow = true;
      this.found = this.records.filter(rec=>`${rec.url}+${rec.command}`.toLowerCase().includes(arg0.toLowerCase()));
    }
    else {
      this.searchNow = false;
    }
  }
  searchNow: any;
  found: RecordItem[];
  refreshPage(headerHeight: string) {
    console.log(headerHeight);
  }
  constructor(
    private recordService: RecordService
  ) { }
  records: RecordItem[] = [];
  some = this.recordService.signal$.subscribe((recs: RecordItem[]) => this.records = recs);

  ngOnInit(): void {
    this.records = this.recordService.list();

  }
  ngAfterViewInit(): void {
  }

  addRecord($event: RecordItem) {
    this.records = this.recordService.add($event);
  }
}

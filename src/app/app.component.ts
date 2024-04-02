import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('searchElem') searchElem!: ElementRef<HTMLInputElement>;
  search() {
    var nativeElement = this.searchElem.nativeElement;
    var searchValue = nativeElement.value;

    if (this.searchKeys.some(key => searchValue.endsWith(key))) {
      searchValue = '';
      nativeElement.value = searchValue;
      this.search();
      return;
    }

    if (searchValue) {
      this.searchNow = true;
      this.found = this.records.filter(rec=>`${rec.url}+${rec.command}`.toLowerCase().includes(searchValue.toLowerCase()));
    }
    else {
      this.searchNow = false;
    }
  }
  searchKeys: string[] = ['`','ё'];
  searchNow: any;
  found: RecordItem[];

  constructor(
    private recordService: RecordService
  ) { }
  records: RecordItem[] = [];
  recordServiceSubscription = this.recordService.signal$.subscribe((recs: RecordItem[]) => {
    this.records = recs;
    this.found = this.records;
    this.search();
  });

  ngOnInit(): void {
    this.records = this.recordService.list();

  }
  handleSearchKeydown(event: KeyboardEvent): void {
    if (this.searchKeys.includes(event.key)) {
      this.searchElem.nativeElement.focus();
      this.search();
    }
  }
  ngAfterViewInit(): void {
    document.addEventListener('keydown', this.handleSearchKeydown.bind(this));
  }
  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleSearchKeydown.bind(this));
  }

  addRecord($event: RecordItem) {
    this.records = this.recordService.add($event);
  }
}

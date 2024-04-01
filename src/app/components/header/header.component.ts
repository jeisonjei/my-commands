import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  @Output() headerHeightCalculated: EventEmitter<string> = new EventEmitter<string>();
  ngAfterViewInit(): void {
    setTimeout(() => {
      var header = document.getElementById('header');
      var headerHeight = window.getComputedStyle(header).getPropertyValue('height');
      document.documentElement.style.setProperty('--header-height', headerHeight);
      this.headerHeightCalculated.emit(headerHeight);
      
    }, 50);
  }

}

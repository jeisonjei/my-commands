import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]',
  standalone: true
})
export class FocusDirective implements AfterViewInit{

  constructor(private element: ElementRef<HTMLElement>) { }
  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }

}

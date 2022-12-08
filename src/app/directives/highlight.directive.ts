import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() appHighlight:string = 'red';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = this.appHighlight;
   }

   @HostListener('mauseenter')
   onMauseEnter(){
    this.el.nativeElement.style.backgroundColor = 'yellow';}

    @HostListener('mauseleave')
    onMauseLeave(){
      this.el.nativeElement.style.backgroundColor= '';
    }
   }


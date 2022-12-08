import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit {

  @Input() appButton!: 'btn btn-primary' | 'btn btn-secondary' | 'btn btn-dark'
  constructor(private el: ElementRef) { 
    this.el.nativeElement.classList = this.appButton
  }
  ngOnInit(): void {
    this.el.nativeElement.classList = this.appButton
  }


  @HostListener('mouseenter')
  onMouseEnter(){
   this.el.nativeElement.style.backgroundColor = 'blue';}

   @HostListener('mouseleave')
   onMouseLeave(){
     this.el.nativeElement.style.backgroundColor= '';
   }


}

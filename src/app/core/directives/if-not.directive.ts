import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngIfNot]',
})
export class IfNotDirective implements OnInit {
  // ViewContainerRef => direktifin uygulandığı elementin kendisi (parent)
  // TemplateRef => direktifin uygulandığı elementin altındaki elementler (childlar)
  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    this.displayTemplate()
  }
  private condition=true
@Input() ngIfNotElse?: TemplateRef<unknown>
  @Input()
  set ngIfNot(condition: boolean) {
    this.condition=condition
    this.displayTemplate()
  }

  private displayTemplate() {
    this._viewContainer.clear();
    if (this.condition) {
      this._viewContainer.createEmbeddedView(this.templateRef);
    }
    else if(this.ngIfNotElse){
      this._viewContainer.createEmbeddedView(this.ngIfNotElse)
    }
  }
}
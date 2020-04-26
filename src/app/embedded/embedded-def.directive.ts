import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appEmbeddedDef]",
})
export class EmbeddedDefDirective<T> {
  constructor(public template: TemplateRef<any>) {}
}

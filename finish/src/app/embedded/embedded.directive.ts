import { Directive } from "@angular/core";

@Directive({
  selector: "app-embedded",
})
export class EmbeddedDirective<T> {
  constructor() {}
}

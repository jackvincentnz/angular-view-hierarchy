import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentChecked,
  ContentChild,
  ComponentFactory,
} from "@angular/core";
import { EmbeddedDefDirective } from "../embedded/embedded-def.directive";

@Component({
  selector: "app-wrapper-component",
  templateUrl: "./wrapper-component.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperComponentComponent<T> implements AfterContentChecked {
  @Input()
  parentTemplate: TemplateRef<T>;

  @Input()
  factory: ComponentFactory<any>;

  @ContentChild(EmbeddedDefDirective)
  embeddedDef?: EmbeddedDefDirective<T>;

  embeddedTemplate?: TemplateRef<T>;

  constructor() {}

  // Have to wait until the content is available before the query will have the template
  ngAfterContentChecked() {
    this.embeddedTemplate = this.embeddedDef?.template;
  }
}

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
  styleUrls: ["./wrapper-component.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperComponentComponent<T> implements AfterContentChecked {
  @Input()
  parentTemplate: TemplateRef<T>;

  @Input()
  factory: ComponentFactory<any>;

  @ContentChild(EmbeddedDefDirective) embeddedDef!: EmbeddedDefDirective<T>;

  embeddedTemplate: TemplateRef<T> | null;

  constructor() {}

  ngAfterContentChecked() {
    this.embeddedTemplate = this.embeddedDef.template;
  }
}

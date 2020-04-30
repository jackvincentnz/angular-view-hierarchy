import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  Optional,
} from "@angular/core";
import { Provided, ViewProvided } from "./injection-tokens";
import { InspectorComponent } from "./inspector/inspector.component";

class AppViewProvided implements ViewProvided {
  providedBy = "AppComponent";
  emoji = "🐳";
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  //viewProviders: [{ provide: ViewProvided, useClass: AppViewProvided }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent<T> {
  constructor(
    private resolver: ComponentFactoryResolver,
    @Optional()
    public provided?: Provided,
    @Optional()
    public viewProvided?: ViewProvided
  ) {}

  factory = this.resolver.resolveComponentFactory(InspectorComponent);
}

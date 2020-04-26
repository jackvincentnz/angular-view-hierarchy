import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
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
  styleUrls: ["./app.component.css"],
  viewProviders: [{ provide: ViewProvided, useClass: AppViewProvided }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent<T> {
  constructor(
    public provided: Provided,
    public viewProvided: ViewProvided,
    private resolver: ComponentFactoryResolver
  ) {
    console.log("AppComponent Initialized.");
  }

  factory = this.resolver.resolveComponentFactory(InspectorComponent);
}

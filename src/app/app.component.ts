import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Ancestor, Provided, ViewProvided } from "./injection-tokens";

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
export class AppComponent {
  constructor(public provided: Provided, public viewProvided: ViewProvided) {
    console.log("AppComponent Initialized.");
  }
}

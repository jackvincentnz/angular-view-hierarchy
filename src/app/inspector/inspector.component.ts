import {
  Component,
  Optional,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Provided, ViewProvided } from "../injection-tokens";

@Component({
  selector: "app-inspector",
  templateUrl: "./inspector.component.html",
  styleUrls: ["./inspector.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorComponent {
  @Input()
  declared: string;

  @Input()
  value: string;

  constructor(public provided: Provided, public viewProvided: ViewProvided) {
    console.log("InspectorComponent Initialized.");
  }
}

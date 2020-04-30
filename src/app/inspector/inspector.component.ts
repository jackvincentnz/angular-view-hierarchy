import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Optional,
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

  constructor(
    @Optional()
    public provided?: Provided,
    @Optional()
    public viewProvided?: ViewProvided
  ) {}
}

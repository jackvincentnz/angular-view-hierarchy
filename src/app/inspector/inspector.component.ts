import {
  Component,
  Optional,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FlowerService } from "../flower.service";
import { AnimalService } from "../animal.service";
import { Parent } from "../parent";

@Component({
  selector: "app-inspector",
  templateUrl: "./inspector.component.html",
  styleUrls: ["./inspector.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorComponent {
  @Input()
  value: string;

  constructor(
    public flower: FlowerService,
    public animal: AnimalService,
    public parent?: Parent
  ) {
    console.log("InspectorComponent Initialized.");
  }
}

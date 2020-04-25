import { Component, Optional } from "@angular/core";
import { FlowerService } from "../flower.service";
import { AnimalService } from "../animal.service";
import { Parent } from "../parent";

@Component({
  selector: "app-inspector",
  templateUrl: "./inspector.component.html",
  styleUrls: ["./inspector.component.css"],
})
export class InspectorComponent {
  constructor(
    public flower: FlowerService,
    public animal: AnimalService,
    @Optional()
    public parent?: Parent
  ) {
    console.log("InspectorComponent Initialized.");
  }
}

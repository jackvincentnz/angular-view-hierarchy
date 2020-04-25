import {
  Component,
  OnInit,
  Host,
  SkipSelf,
  Optional,
  Input,
  TemplateRef,
} from "@angular/core";
import { FlowerService } from "../flower.service";
import { AnimalService } from "../animal.service";
import { Parent } from "../parent";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
  providers: [
    { provide: FlowerService, useValue: { emoji: "🌻" } },
    { provide: Parent, useValue: { name: "ChildComponent" } },
  ],
  viewProviders: [{ provide: AnimalService, useValue: { emoji: "🐶" } }],
})
export class ChildComponent<T> {
  @Input()
  templates: TemplateRef<T>[];

  constructor(public flower: FlowerService, public animal: AnimalService) {
    console.log("ChildComponent Initialized.");
  }
}

import { Component } from "@angular/core";
import { FlowerService } from "./flower.service";
import { AnimalService } from "./animal.service";
import { Parent } from "./parent";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [{ provide: Parent, useValue: { name: "AppComponent" } }],
})
export class AppComponent {
  constructor(public flower: FlowerService, public animal: AnimalService) {
    console.log("AppComponent Initialized.");
  }
}
